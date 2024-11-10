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
            if (promedio <= 1.99) return "Existen políticas y controles básicos de gobernanza, pero carecen de actualización y no cubren aspectos avanzados como la calidad de datos o la privacidad en profundidad.";
            if (promedio <= 3.99) return "La gobernanza es sólida y se aplican políticas avanzadas de calidad y seguridad de datos, aunque todavía podrían mejorarse los procesos de automatización y monitoreo en tiempo real.";
            return "La empresa cuenta con un marco de gobernanza de datos altamente automatizado y en tiempo real, con políticas avanzadas que incluyen calidad de datos, seguridad, y cumplimiento normativo, optimizadas para una adaptación ágil a cambios regulatorios o de mercado.";

        case "Procesos Analíticos":
            if (promedio <= 1.99) return "Los análisis avanzados son limitados o no están bien integrados; la empresa no aprovecha del todo las herramientas analíticas más sofisticadas ni modelos predictivos o prescriptivos.";
            if (promedio <= 3.99) return "La empresa realiza análisis predictivos y prescriptivos en varias áreas, aunque no siempre con la agilidad deseada. Los datos se utilizan en la mayoría de decisiones estratégicas, pero no siempre se maximizan en todas las áreas.";
            return "Los análisis son altamente sofisticados, incluyendo machine learning y modelos prescriptivos que guían decisiones estratégicas y operativas en tiempo real. La analítica de datos es un motor clave de innovación y eficiencia en la empresa.";

        case "Infraestructura Tecnológica":
            if (promedio <= 1.99) return " La infraestructura es adecuada para tareas básicas, pero tiene limitaciones para soportar grandes volúmenes de datos y análisis en tiempo real, restringiendo la eficiencia y escalabilidad.";
            if (promedio <= 3.99) return "La infraestructura permite análisis complejos y procesamiento de grandes volúmenes de datos, aunque algunas áreas de tecnología podrían beneficiarse de actualizaciones para optimizar la eficiencia.";
            return "La infraestructura es de última generación, con capacidad para procesar grandes volúmenes de datos en tiempo real y de manera segura, permitiendo una flexibilidad completa para adaptarse a los cambios tecnológicos.";

        case "Capacidades y Competencias":
            if (promedio <= 1.99) return "A pesar de los conocimientos avanzados del personal, no se incentiva suficientemente el aprendizaje continuo ni se fomenta el dominio de herramientas analíticas más complejas.";
            if (promedio <= 3.99) return " La mayoría del personal cuenta con competencias avanzadas, y se ofrecen programas continuos de capacitación, aunque la especialización en nuevas herramientas podría ser más consistente.";
            return "Los empleados tienen un dominio avanzado de las herramientas y técnicas analíticas, con programas de capacitación continua que fomentan la especialización y la adopción de tecnologías emergentes.";

        case "Estrategia y Cultura":
            if (promedio <= 1.99) return "La cultura de datos existe, pero no está completamente alineada con la innovación, y algunos equipos no se sienten motivados a adoptar un enfoque de datos en todas las decisiones.";
            if (promedio <= 3.99) return "Existe una cultura de datos bien establecida, y el uso de datos se considera esencial, pero algunas decisiones estratégicas aún podrían beneficiarse de una integración más profunda de la analítica.";
            return "La estrategia está profundamente alineada con una cultura de datos, y la organización valora el uso de datos en todos los niveles, con una orientación proactiva hacia la innovación, el aprendizaje continuo y la mejora de procesos a través de la analítica avanzada.";

        default:
            return '';
    }
};


const NivelAlto: React.FC = () => {
    const preguntas = [
        "¿La empresa cuenta con políticas avanzadas de gobernanza de datos que están alineadas y se actualizan regularmente con las mejores prácticas de la industria?",
        "¿Existen procesos rigurosos y automatizados para asegurar la calidad y exactitud de los datos en toda la organización?",
        "¿La gestión de datos incluye protocolos de seguridad avanzados, y los roles y accesos están definidos de manera granular y dinámica?",
        "¿Los estándares de gobernanza de datos son revisados y mejorados de forma continua para adaptarse a nuevos desafíos y regulaciones?",
        "¿La gobernanza de datos está integrada en todas las áreas de la empresa y respalda los objetivos estratégicos de manera efectiva?",
    
        "¿La empresa utiliza análisis predictivo y prescriptivo avanzado para la toma de decisiones en todas las áreas estratégicas?",
        "¿Los procesos analíticos están automatizados y permiten generar insights en tiempo real para diferentes departamentos?",
        "¿Se utilizan técnicas avanzadas de modelado y análisis de datos, incluyendo machine learning e inteligencia artificial?",
        "¿Los datos se emplean de manera proactiva para identificar y mitigar riesgos, optimizar procesos y descubrir oportunidades de negocio?",
        "¿Existe una sólida infraestructura que soporta modelos analíticos avanzados y facilita la experimentación y mejora continua de los procesos?",
    
        "¿La empresa cuenta con una infraestructura tecnológica escalable que permite manejar grandes volúmenes de datos en tiempo real?",
        "¿Existen herramientas y plataformas avanzadas que permiten la integración y acceso seguro a datos de múltiples fuentes en toda la organización?",
        "¿La infraestructura permite el uso de herramientas avanzadas de analítica y modelos de machine learning e inteligencia artificial?",
        "¿Los sistemas están diseñados para adaptarse a cambios y crecer según la demanda de datos, con mínima intervención manual?",
        "¿La empresa invierte de forma continua en nuevas tecnologías y mejoras que optimizan el procesamiento y análisis de datos?",
    
        "¿El equipo tiene un nivel avanzado de competencia en ciencia de datos, estadística y técnicas de análisis de datos?",
        "¿La empresa fomenta una cultura de aprendizaje continuo, proporcionando capacitación avanzada y certificaciones en áreas de análisis de datos y tecnología?",
        "¿Existe un equipo especializado en análisis de datos que colabora con todas las áreas de la empresa para apoyar la toma de decisiones basada en datos?",
        "¿Los empleados a todos los niveles comprenden el valor estratégico de los datos y son capaces de interpretar y aplicar insights en su trabajo diario?",
        "¿La empresa promueve la experimentación y la innovación en el análisis de datos, incentivando el desarrollo de nuevas soluciones y modelos?",
    
        "¿La empresa tiene una estrategia bien definida y alineada que prioriza el uso de datos y la analítica para alcanzar sus objetivos estratégicos?",
        "¿La alta dirección lidera y promueve activamente una cultura de toma de decisiones basada en datos en toda la organización?",
        "¿La organización está comprometida con la innovación y la transformación digital, utilizando datos como un activo central en todas las áreas?",
        "¿Existe una cultura organizacional donde cada área colabora y comparte datos para maximizar el valor de los insights?",
        "¿Los datos son vistos como un activo fundamental, y todos los colaboradores están alineados con la visión de ser una empresa orientada al análisis y manejo de datos?"
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

export default NivelAlto;
