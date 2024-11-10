import React, { useState } from 'react';
import BotonesRespuesta from './BotonesRespuesta';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

import ComentarioIcono from '../assets/images/comentario.svg';
import ComentarioIconoEnviado from '../assets/images/comentario_enviado.svg';

const obtenerMensajePorSeccion = (seccion: string, promedio: number) => {
    switch (seccion) {
        case "Procesos de Gobernanza y Gestión":
            if (promedio <= 1.99) return "Existen políticas de gobernanza, pero no están integradas plenamente en toda la organización. La supervisión es limitada, y el cumplimiento es esporádico.";
            if (promedio <= 3.99) return "Hay políticas de gobernanza bien definidas y aplicadas en la mayoría de las áreas. Se realizan auditorías periódicas, pero puede faltar mayor integración y automatización.";
            return "Las políticas de gobernanza están integradas en toda la organización, se aplican de manera uniforme y cuentan con revisiones regulares para garantizar la calidad de los datos.";

        case "Procesos Analíticos":
            if (promedio <= 1.99) return "Los procesos de análisis de datos no están sistematizados y son esporádicos, lo que limita la capacidad de obtener insights útiles para la toma de decisiones.";
            if (promedio <= 3.99) return "Los análisis de datos se realizan regularmente y son útiles para la toma de decisiones en diversas áreas, aunque su alcance es limitado y no aprovecha aún el análisis predictivo avanzado.";
            return "La empresa aplica análisis avanzados, incluyendo analítica predictiva en algunas áreas, y los resultados se utilizan activamente en la toma de decisiones estratégicas.";

        case "Infraestructura Tecnológica":
            if (promedio <= 1.99) return "Tecnológica: La infraestructura está presente, pero es insuficiente para un análisis de datos a gran escala y no permite un flujo de datos eficiente entre sistemas.";
            if (promedio <= 3.99) return "La infraestructura permite un manejo eficaz de los datos, pero es necesario invertir en mayor escalabilidad y eficiencia para soportar análisis más avanzados.";
            return "La infraestructura es robusta, permite una integración de datos eficiente y soporta herramientas avanzadas de análisis de datos, como machine learning en áreas selectas.";

        case "Capacidades y Competencias":
            if (promedio <= 1.99) return "Las competencias en análisis de datos varían entre los empleados, y la capacitación es ocasional y no prioritaria.";
            if (promedio <= 3.99) return " La mayoría de los empleados posee una competencia intermedia en análisis de datos, y la empresa ofrece capacitaciones frecuentes para fortalecer estas habilidades.";
            return "Los empleados están bien capacitados y cuentan con competencias avanzadas en análisis de datos. La empresa promueve la especialización y ofrece oportunidades de desarrollo para el uso de herramientas avanzadas.";

        case "Estrategia y Cultura":
            if (promedio <= 1.99) return "La empresa ha identificado el valor de los datos en su estrategia, pero la cultura de datos no es sólida, y algunos empleados aún no adoptan este enfoque en su trabajo diario.";
            if (promedio <= 3.99) return "La cultura de datos está bastante integrada, y el uso de datos se valora a nivel estratégico en la mayoría de las áreas, aunque algunos departamentos podrían no estar tan alineados.";
            return "La estrategia empresarial está alineada con un enfoque orientado a los datos, y existe una cultura de toma de decisiones basada en datos en toda la organización, respaldada por la alta dirección.";

        default:
            return '';
    }
};

const NivelMedio: React.FC = () => {
    const preguntas = [
        "¿Existen políticas y procedimientos claros de gobernanza de datos que guían el manejo de datos en la empresa?",
        "¿La empresa realiza controles regulares para asegurar la calidad y consistencia de los datos?",
        "¿Se asignan responsables específicos para supervisar el cumplimiento de las políticas de datos?",
        "¿Hay procesos establecidos para la gestión de acceso y seguridad de los datos en distintos niveles?",
        "¿La gobernanza de datos está alineada con los objetivos estratégicos de la empresa?",
    
        "¿La empresa utiliza datos de manera consistente para realizar análisis descriptivos y algunos análisis predictivos?",
        "¿Se generan reportes periódicos que ayudan a detectar patrones o tendencias en los datos?",
        "¿Existen procedimientos estructurados para la recopilación, limpieza y análisis de datos?",
        "¿La empresa utiliza herramientas que permiten realizar análisis automatizados de datos?",
        "¿Los análisis de datos se emplean para optimizar ciertos procesos o decisiones clave en la organización?",
    
        "¿La infraestructura tecnológica permite almacenar y procesar datos de manera eficiente para el volumen actual de la empresa?",
        "¿Existen sistemas que permiten a distintos departamentos compartir y acceder a datos cuando es necesario?",
        "¿La empresa cuenta con herramientas analíticas básicas y avanzadas, aunque limitadas en algunos aspectos?",
        "¿La infraestructura es suficiente para soportar reportes automatizados y almacenamiento de grandes volúmenes de datos?",
        "¿La tecnología de la empresa se actualiza periódicamente para mejorar la capacidad de análisis de datos?",
    
        "¿El personal cuenta con habilidades intermedias en análisis de datos y uso de herramientas de análisis?",
        "¿Se ofrecen programas de capacitación para mejorar las competencias analíticas y técnicas del personal?",
        "¿Hay un equipo de personas con conocimientos específicos en análisis de datos y modelado básico?",
        "¿Los empleados tienen conocimientos básicos sobre cómo interpretar y utilizar los datos en sus tareas diarias?",
        "¿La empresa fomenta el desarrollo de habilidades en análisis y manejo de datos entre su personal?",
    
        "¿La analítica y el uso de datos están integrados en las decisiones estratégicas de varias áreas de la empresa?",
        "¿Existe una cultura organizacional que incentiva el uso de datos para justificar decisiones?",
        "¿La alta dirección reconoce y promueve el valor de los datos y la analítica en la empresa?",
        "¿Hay una estrategia clara para aumentar el uso de datos y análisis en la toma de decisiones a lo largo de la organización?",
        "¿Se fomenta la colaboración entre departamentos para mejorar el uso y análisis de datos?"
    ];
    

    const secciones = [
        "Procesos de Gobernanza y Gestión",
        "Procesos Analíticos",
        "Infraestructura Tecnológica",
        "Capacidades y Competencias",
        "Estrategia y Cultura"
    ];

    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<number[]>(Array(preguntas.length).fill(0));
    const [comentarios, setComentarios] = useState<string[]>(Array(preguntas.length).fill(''));
    const [cuadroComentarioAbierto, setCuadroComentarioAbierto] = useState<boolean[]>(Array(preguntas.length).fill(false));
    const [iconoComentarioColor, setIconoComentarioColor] = useState<boolean[]>(Array(preguntas.length).fill(false));
    const [mostrarGrafico, setMostrarGrafico] = useState(false);

    const manejarRespuestaSeleccionada = (index: number, respuesta: number) => {
        const nuevasRespuestas = [...respuestasSeleccionadas];
        nuevasRespuestas[index] = respuesta;
        setRespuestasSeleccionadas(nuevasRespuestas);
    };

    const manejarComentarioAbierto = (index: number) => {
        const nuevoEstado = [...cuadroComentarioAbierto];
        nuevoEstado[index] = !nuevoEstado[index];
        setCuadroComentarioAbierto(nuevoEstado);
    };

    const manejarComentarioCambio = (index: number, comentario: string) => {
        const nuevosComentarios = [...comentarios];
        nuevosComentarios[index] = comentario;
        setComentarios(nuevosComentarios);
    };

    const manejarComentarioEnviar = (index: number) => {
        const nuevosIconos = [...iconoComentarioColor];
        nuevosIconos[index] = true;
        setIconoComentarioColor(nuevosIconos);
        manejarComentarioAbierto(index);
    };

    const calcularPromedioPorSeccion = (inicio: number, fin: number) => {
        const respuestasSeccion = respuestasSeleccionadas.slice(inicio, fin);
        const total = respuestasSeccion.reduce((acc, val) => acc + val, 0);
        return total / respuestasSeccion.length || 0;
    };

    const calcularPromedioGeneral = () => {
        const totalRespuestas = [
            calcularPromedioPorSeccion(0, 5),
            calcularPromedioPorSeccion(5, 10),
            calcularPromedioPorSeccion(10, 15),
            calcularPromedioPorSeccion(15, 20),
            calcularPromedioPorSeccion(20, 25)
        ];

        const suma = totalRespuestas.reduce((acumulado, actual) => acumulado + actual, 0);
        return suma / totalRespuestas.length;
    };

    const dataGrafico = {
        labels: secciones,
        datasets: [
            {
                label: 'Promedio por Sección',
                data: [
                    calcularPromedioPorSeccion(0, 5),
                    calcularPromedioPorSeccion(5, 10),
                    calcularPromedioPorSeccion(10, 15),
                    calcularPromedioPorSeccion(15, 20),
                    calcularPromedioPorSeccion(20, 25)
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const renderSeccionPreguntas = (titulo: string, preguntasSeccion: string[], offset: number) => (
        <div>
            <h2 className="text-2xl mb-6 font-bold text-black">{titulo}</h2>
            {preguntasSeccion.map((pregunta, index) => (
                <div key={index + offset} className="pregunta mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                        Pregunta {index + offset + 1}: {pregunta}
                        <img
                            src={iconoComentarioColor[index + offset] ? ComentarioIconoEnviado : ComentarioIcono}
                            alt="Comentario"
                            onClick={() => manejarComentarioAbierto(index + offset)}
                            className="h-5 w-5 ml-2 cursor-pointer"
                        />
                    </h3>
                    <BotonesRespuesta
                        respuestas={[1, 2, 3, 4, 5]}
                        respuestaSeleccionada={respuestasSeleccionadas[index + offset]}
                        onRespuestaSeleccionada={(respuesta) => manejarRespuestaSeleccionada(index + offset, respuesta)}
                    />
                    {cuadroComentarioAbierto[index + offset] && (
                        <div className="mt-4 flex flex-col items-center md:items-start">
                            <textarea
                                className="border p-2 w-full md:w-1/2"
                                placeholder="Escribe tu comentario aquí..."
                                value={comentarios[index + offset]}
                                onChange={(e) => manejarComentarioCambio(index + offset, e.target.value)}
                            />
                            <button
                                className="mt-2 bg-red-600 text-white py-2 px-4 rounded w-full md:w-1/2"
                                onClick={() => manejarComentarioEnviar(index + offset)}
                            >
                                Enviar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const manejarEnvioFinal = () => {
        setMostrarGrafico(true);
    };

    return (
        <div className="nivel-basico container mx-auto p-6 bg-white shadow-lg rounded-lg">
            {renderSeccionPreguntas("Procesos de Gobernanza y Gestión", preguntas.slice(0, 5), 0)}
            {renderSeccionPreguntas("Procesos Analíticos", preguntas.slice(5, 10), 5)}
            {renderSeccionPreguntas("Infraestructura Tecnológica", preguntas.slice(10, 15), 10)}
            {renderSeccionPreguntas("Capacidades y Competencias", preguntas.slice(15, 20), 15)}
            {renderSeccionPreguntas("Estrategia y Cultura", preguntas.slice(20, 25), 20)}

            <div className="mt-6">
                <h3 className="text-xl font-bold">Promedio General: {calcularPromedioGeneral().toFixed(2)}</h3>
            </div>

            <button
                className="mt-6 bg-red-600 text-white py-2 px-4 rounded w-full md:w-1/2"
                onClick={manejarEnvioFinal}
            >
                Enviar
            </button>

            {/* Mostrar gráfico y tabla */}
            {mostrarGrafico && (
                <div className="mt-8 bg-white p-4 shadow-lg rounded-lg" style={{ width: '100%', height: 'auto' }}>
                    <h2 className="text-2xl font-bold text-black mb-4 text-center">Promedio de Respuestas por Sección</h2>

                    {/* Contenedor del gráfico ocupando todo el espacio disponible */}
                    <div className="relative" style={{ width: '100%', height: '400px' }}>
                        <Radar data={dataGrafico} width="100%" height="100%" />
                    </div>

                    {/* Tabla de promedios por sección */}
                    <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
    <thead>
        <tr className="bg-red-600"> {/* Fondo rojo fuerte */}
            <th className="px-4 py-2 text-left border-b border-red-500 text-red-100">Sección</th>
            <th className="px-4 py-2 text-left border-b border-red-500 text-red-100">Promedio</th>
            <th className="px-4 py-2 text-left border-b border-red-500 text-red-100 text-center">¿Cómo se encuentra tu empresa?</th>
        </tr>
    </thead>
    <tbody>
        {secciones.map((seccion, index) => {
            const promedio = [
                calcularPromedioPorSeccion(0, 5),
                calcularPromedioPorSeccion(5, 10),
                calcularPromedioPorSeccion(10, 15),
                calcularPromedioPorSeccion(15, 20),
                calcularPromedioPorSeccion(20, 25),
            ][index];

            const mensaje = obtenerMensajePorSeccion(seccion, promedio);

            return (
                <tr key={index} className="hover:bg-red-100"> {/* Efecto hover en rojo claro */}
                    <td className="px-4 py-2 border-b border-red-500 text-red-900">{seccion}</td>
                    <td className="px-4 py-2 border-b border-red-500 text-red-900">{promedio.toFixed(2)}</td>
                    <td className="px-4 py-2 border-b border-red-500 text-red-900 text-center">{mensaje}</td> {/* Texto centrado */}
                </tr>
            );
        })}
    </tbody>
</table>

                    </div>
                </div>
            )}
        </div>
    );
};

export default NivelMedio;
