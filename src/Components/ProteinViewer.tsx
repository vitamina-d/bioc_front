import { useEffect, useRef } from "react";
import * as $3Dmol from "3dmol";

type Props = {
    pdbId: string;
    prediction?: string;
    style?: "stick" | "cartoon" | "line" | "sphere"; //renderizado
};

function MolstarViewer({ pdbId, prediction, style = "cartoon" }: Props) {
    const htmlElem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (htmlElem.current) {
            const config = {
                backgroundColor: "white",
                defaultcolors: $3Dmol.elementColors.rasmol,
                antialias: true, //suave
                disableFog: true, //niebla
            };
            const viewer = $3Dmol.createViewer(htmlElem.current, config);
            const filter = {}; //filtrar de pdb

            $3Dmol.download(
                `pdb:${pdbId}`,
                viewer,
                filter,
                (mv: $3Dmol.GLViewer) => {
                    const atoms: $3Dmol.AtomSpec[] = mv.selectedAtoms({});
                    const chains = new Set(
                        atoms.map((atom: $3Dmol.AtomSpec) => atom.chain)
                    );
                    console.log("Cadenas:", Array.from(chains));
                    console.log("Cantidad de cadenas:", chains.size);
                    //colorscheme que tipos colorear
                    //selector
                    viewer.setStyle({}, { [style]: { color: "yellow" } });
                    //mv.setStyle({[style]:{colorscheme:{prop:'ss',map:$3Dmol.ssColors.Jmol}}});
                    //mv.setStyle({chain:"A"}, {cartoon:{color:"spectrum"}});
                    //mv.setStyle({resn:"ATP"}, {stick:{color:"yellow"}});
                    //mv.setStyle({hetflag:true}, {sphere:{radius:1.0, color:"red"}});

                    //mv.setStyle({chain:'B'},{'cartoon':{color:'black',opacity:1}});
                    //mv.setStyle({chain:'C'},{'cartoon':{style:'trace',color:'blue'}});
                    //mv.setStyle({chain:'E'},{'cartoon':{tubes:true,arrows:true,color:'green',opacity:0.75}});
                    //mv.setStyle({chain:'D'},{'cartoon':{style:'trace',color:'yellow',opacity:0.75}});
                    //mv.setStyle({chain:'F'},{'cartoon':{arrows:true,color:'cian'}});

                    //Surface type (VDW, MS, SAS, or SES) van der waal, molecular, solvent accesible o solvent expose
                    //viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity: 0.85, voldata: new $3Dmol.VolumeData("green", "cube "), volscheme: new $3Dmol.Gradient.ROYGB(2, 4)});
                    //viewer.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.9, color:"lightgrey"}, {});
                    //viewer.addSurface($3Dmol.SurfaceType.SAS, {opacity:0.5, color:"blue"}, {chain:"A"});
                    //viewer.addSurface($3Dmol.SurfaceType.SES, {opacity:0.5, color:"green"}, {resi:100});

                    //PREDICTION FILE PDB STRING
                    if (prediction) {
                        viewer.addModel(prediction, "pdb");
                        viewer.setStyle(
                            { model: 1 },
                            { cartoon: { color: "black" } }
                        );
                    }
                    viewer.zoomTo();
                    viewer.render();
                }
            );
        }
    }, [pdbId]);

    return (
        <div
            ref={htmlElem}
            style={{ width: "100%", height: "400px", position: "relative" }}
        />
    );
}

export default MolstarViewer;
/*

    (method) GLViewer.setStyle(sel: $3Dmol.AtomSelectionSpec, style: $3Dmol.AtomStyleSpec): any (+1 overload)
    Set style properties to all selected atoms
    @param sel — Atom selection specification. Can be omitted to select all.
    @param style — Style spec to apply to specified atoms
    @example
    viewer.setBackgroundColor(0xffffffff);
    $3Dmol.download('pdb:5IRE',viewer,{doAssembly: false},function(m) {
    m.setStyle({chain:'A'},{'cartoon':{color:'spectrum'}});
    m.setStyle({chain:'C'},{'cartoon':{style:'trace',color:'blue'}});
    m.setStyle({chain:'E'},{'cartoon':{tubes:true,arrows:true,color:'green',opacity:0.75}});
    m.setStyle({chain:'B'},{'cartoon':{color:'red',opacity:0.5}});
    m.setStyle({chain:'D'},{'cartoon':{style:'trace',color:'grey',opacity:0.75}});
    m.setStyle({chain:'F'},{'cartoon':{arrows:true,color:'white'}});
    // viewer.addStyle({chain:'B'},{line:{}});
    viewer.zoomTo();
    viewer.render();
    });
    
    
    
    m.addSurface(
    
    $3Dmol.SurfaceType.VDW, {opacity: 0.85, voldata: new $3Dmol.VolumeData("red", "cube "), volscheme: new $3Dmol.Gradient.ROYGB(2, 4)});
    m.addSurface($3Dmol.SurfaceType.VDW, {opacity:0.9, color:"lightgrey"}, {});
    m.addSurface($3Dmol.SurfaceType.SAS, {opacity:0.5, color:"blue"}, {chain:"A"});
    m.addSurface($3Dmol.SurfaceType.SES, {opacity:0.5, color:"green"}, {resi:100});
    
*/
