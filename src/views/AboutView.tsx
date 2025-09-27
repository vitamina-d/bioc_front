import Header from "../Components/Header";

function AboutView() {
    return (
        <div className="row mx-1 ">
            <Header
                title="v i t a m i n a"
                text="Tema: Aplicación web para el análisis de datos genómicos relacionados con la Vitamina D, su estudio y caracterización."
                imageSrc="../../public/gene.png"
            />
        </div>
    );
}

export default AboutView;
