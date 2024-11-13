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
            if (promedio <= 1.99) return "La empresa no cuenta con políticas claras de gestión de datos; la gobernanza es mínima y no existe supervisión o cumplimiento formal.";
            if (promedio <= 3.99) return "Existen algunas políticas de gobernanza de datos, pero están en una etapa inicial y no se aplican de manera uniforme en toda la organización.";
            return "Las políticas de gobernanza están claras y estandarizadas, y se aplican en toda la organización con responsabilidad asignada para la supervisión y cumplimiento.";

        case "Procesos Analíticos":
            if (promedio <= 1.99) return "Hay una ausencia casi total de procesos analíticos formales, y el análisis de datos no se emplea en la toma de decisiones.";
            if (promedio <= 3.99) return "Se realizan análisis de datos básicos que ayudan en ciertas decisiones, pero el alcance es limitado y los resultados no siempre se aprovechan en todas las áreas.";
            return "Los análisis básicos están formalizados y se aplican de manera consistente para apoyar decisiones en varias áreas de la empresa.";

        case "Infraestructura Tecnológica":
            if (promedio <= 1.99) return "La tecnología es insuficiente para soportar el almacenamiento y procesamiento de datos, y no facilita el acceso a los datos en la empresa.";
            if (promedio <= 3.99) return "La tecnología permite un manejo básico de datos, aunque con limitaciones de capacidad y alcance que restringen el análisis y la accesibilidad.";
            return "La infraestructura tecnológica es adecuada para soportar el almacenamiento y procesamiento de datos básicos, con sistemas y herramientas que permiten la integración de datos en los procesos.";

        case "Capacidades y Competencias":
            if (promedio <= 1.99) return "El personal tiene conocimientos limitados en análisis de datos; faltan competencias básicas, y no se ofrecen capacitaciones.";
            if (promedio <= 3.99) return "El personal cuenta con habilidades básicas en análisis de datos, y la empresa ha comenzado a capacitar a ciertos empleados, aunque no de manera generalizada";
            return "La mayoría del personal tiene un buen nivel de conocimiento en el uso y análisis básico de datos, y las capacitaciones son accesibles a más empleados.";

        case "Estrategia y Cultura":
            if (promedio <= 1.99) return "Los datos no forman parte de la estrategia empresarial, y la cultura de datos está prácticamente ausente en la organización.";
            if (promedio <= 3.99) return "Existe cierta conciencia sobre el valor de los datos, y algunas áreas comienzan a integrar su uso en la estrategia y cultura, aunque falta un enfoque más amplio y coordinado.";
            return "Existe un compromiso a nivel de toda la organización por incorporar los datos en la estrategia empresarial, y la cultura de datos está en crecimiento, con un respaldo visible por parte de la dirección.";

        default:
            return '';
    }
};

const NivelBasico: React.FC = () => {
    const preguntas = [
        // Procesos de Gobernanza y Gestión
        "¿Existe una política formal de gobernanza de datos en la empresa?",
        "¿Los datos se manejan con prácticas estandarizadas y consistentes?",
        "¿La empresa cuenta con medidas básicas para asegurar la privacidad y seguridad de los datos?",
        "¿Hay roles y responsabilidades claros para la gestión de los datos?",
        "¿Las políticas de manejo de datos están documentadas y accesibles para todos?",

        // Procesos Analíticos
        "¿Se generan reportes básicos regularmente para apoyar la toma de decisiones?",
        "¿Los análisis de datos suelen realizarse de manera estructurada y consistente?",
        "¿La empresa utiliza herramientas básicas para el análisis de datos, como hojas de cálculo?",
        "¿Los datos se emplean en algunos procesos de toma de decisiones?",
        "¿Existen procedimientos mínimos para la recopilación y verificación de datos?",

        // Infraestructura Tecnológica
        "¿La empresa cuenta con un sistema básico para almacenar sus datos?",
        "¿Los datos pueden ser accesibles para los empleados que los necesitan, aunque sea de manera limitada?",
        "¿Existen herramientas básicas para realizar análisis de datos, aunque sea manualmente?",
        "¿La infraestructura tecnológica permite el manejo de datos esenciales, aunque sin automatización?",
        "¿Los sistemas de almacenamiento y procesamiento de datos son suficientes para el volumen de datos actual?",

        // Capacidades y Competencias
        "¿El equipo tiene competencias básicas para trabajar con datos, como conocimientos de hojas de cálculo?",
        "¿Los empleados están familiarizados con los conceptos básicos de análisis de datos?",
        "¿Existen capacitaciones o recursos para mejorar las habilidades en el manejo de datos?",
        "¿La empresa reconoce la importancia de contar con habilidades de análisis de datos?",
        "¿Hay colaboradores asignados que poseen experiencia básica en gestión de datos?",

        // Estrategia y Cultura
        "¿La analítica y el uso de datos se consideran al tomar decisiones estratégicas, aunque de forma limitada?",
        "¿La empresa valora los datos, aunque no son un elemento fundamental en todas las decisiones?",
        "¿Se reconoce en algunos niveles de la empresa la importancia de una cultura basada en datos?",
        "¿La organización está comenzando a crear conciencia sobre el valor de los datos?",
        "¿Existen esfuerzos iniciales para integrar el uso de datos en la cultura de la empresa?"
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
                        <Radar data={dataGrafico}
                            options={{
                                scales: {
                                    r: {
                                        beginAtZero: true,
                                        min: 0,
                                        max: 5
                                    }
                                }
                            }} width="100%" height="100%" />
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

export default NivelBasico;
