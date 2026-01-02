# 🧬 bioc_front

Frontend del proyecto **Vitamina-D BioC** para consultar, visualizar y analizar secuencias genómicas y proteínas.

## 📋 Descripción

**bioc_front** es una aplicación web desarrollada con React y TypeScript para trabajar con datos bioinformáticos. La aplicación permite:

- Buscar y visualizar secuencias genómicas
- Realizar alineamientos de secuencias
- Ejecutar análisis BLAST
- Visualizar estructuras de proteínas en 3D
- Consultar información detallada de genes

## ✨ Funcionalidades Principales

### 🔍 Búsqueda de Secuencias
- Selección de fuente de datos (BSGenome, Ensembl)
- Búsqueda por cromosoma y rango de posiciones
- Visualización de secuencias genómicas resultantes

### 🧪 Análisis BLAST
- Ejecución de análisis BLASTx
- Comparación de secuencias contra bases de datos
- Visualización de resultados y alineamientos

### 🔗 Alineamiento de Secuencias
- Alineamiento múltiple de secuencias
- Visualización interactiva de alineamientos
- Análisis comparativo

### 🧬 Visualización de Proteínas
- Visualización 3D de estructuras proteicas con 3Dmol.js
- Representación interactiva de modelos moleculares
- Análisis de detalles estructurales

### 📊 Detalles de Genes
- Información completa de genes por Entrez ID
- Datos de anotación genómica
- Enlaces a recursos externos

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.1** - Biblioteca de UI
- **TypeScript 5.8** - Tipado estático
- **Vite 7.0** - Build tool y dev server
- **React Router DOM 7.8** - Enrutamiento

### UI/UX
- **Bootstrap 5.3** - Framework CSS
- **React Bootstrap 2.10** - Componentes React

### Visualización
- **Plotly.js 3.1** - Gráficos interactivos
- **React Plotly.js 2.6** - Integración con React
- **3Dmol 2.5** - Visualización molecular 3D

## 📁 Estructura del Proyecto

```
bioc_front/
├── src/
│   ├── Components/      # Componentes reutilizables
│   ├── views/           # Vistas/páginas de la aplicación
│   │   ├── HomeView.tsx
│   │   ├── SearchView.tsx
│   │   ├── DetailView.tsx
│   │   ├── AlignView.tsx
│   │   ├── BlastxView.tsx
│   │   ├── ProteinView.tsx
│   │   └── AboutView.tsx
│   ├── services/       # Servicios API
│   ├── types/          # Definiciones TypeScript
│   ├── utils/          # Utilidades
│   ├── context/        # Context API
│   ├── constant/       # Constantes
│   ├── wrapper/        # Wrappers de componentes
│   ├── assets/         # Recursos estáticos
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Punto de entrada
├── Dockerfile          # Configuración Docker
├── package.json        # Dependencias
└── README.md          # Este archivo
```

## 🚀 Inicio Rápido

```bash
git clone https://github.com/vitamina-d/bioc_front.git

cd bioc_front

npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔗 Integración con el Ecosistema

**bioc_front** forma parte del ecosistema **Vitamina-D** y se integra con:

- **[bioc_back](https://github.com/vitamina-d/bioc_back)** - API REST en ASP.NET Core
- **[bioc_r](https://github.com/vitamina-d/bioc_r)** - Servicio R con Plumber para análisis genómicos
- **[bioc_blast](https://github.com/vitamina-d/bioc_blast)** - Servicio BLAST
- **[doc](https://github.com/vitamina-d/doc)** - Documentación del proyecto

## 🌐 Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/search` | Búsqueda de secuencias genómicas |
| `/detail/:entrezId` | Detalles de un gen específico |
| `/align` | Alineamiento de secuencias |
| `/blastx` | Análisis BLASTx |
| `/protein` | Visualización de proteínas 3D |
| `/about` | Información sobre el proyecto |

## 📝 Licencia

Este proyecto tiene fines educativos y forma parte del Proyecto Integrador Profesional (PIP).
