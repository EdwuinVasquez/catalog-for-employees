import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

/*-- Clases y controladores --*/
import { admin } from "../../../../../backend/class/admin.js";
import { nombreEstado } from '../../../../../backend/funcioneGenerales.js';
import { FiltrosDatosTabla } from '../reportes/filtros.jsx';
const classAdmin = new admin();
Chart.register(...registerables);


function formatoFecha(fecha, formato) {
    return formato.replace('mm', fecha.getMonth() + 1)
        .replace('yy', fecha.getFullYear())
        .replace('dd', fecha.getDate());
}

const fecha = Date.now();
const hoy = new Date(fecha);
const fechaActual = formatoFecha(hoy, "yy-mm-dd");

/*-- Validar fecha en rango --*/
const validarFechaEnRango = ((vFechaInicio, vFechaFin, vFechaValidar) => {
    const fechaInicioMs = new Date(vFechaInicio).getTime();
    const fechaFinMs = new Date(vFechaFin).getTime();
    const fechaValidarMs = new Date(vFechaValidar).getTime();

    if (fechaValidarMs >= fechaInicioMs && fechaValidarMs <= fechaFinMs) {
        return true;
    } else {
        return false;
    }
});

/*-- tipo de estado --*/
const asignarEstadoNombre = ((estado) => {
    switch (parseInt(estado)) {
        case 2:
            return "CANCELADO"
        case 3:
            return "PENDIENTE"
        case 4:
            return "ENTREGADO"
        case 5:
            return "PAGO"
        default:
            return -1;
    }
});


export const HomeGraficos = () => {
    const chartRef = useRef(null);
    const chartRefOne = useRef(null);
    const chartRefTwo = useRef(null);
    const chartRefThree = useRef(null);

    /*-- fecha inicial seleccionada --*/
    const [fechaInicial, setFechaInicial] = useState("2000-1-1 00:00:05");

    /*-- fecha final seleccionada --*/
    const [fechaFinal, setFechaFinal] = useState(`${fechaActual} 23:59:05`);

    /*-- Filtro de estados --*/
    const [estadoFiltro, setEstadoFiltro] = useState("CANCELADO, PENDIENTE, PAGO, ENTREGADO");

    const [ventas, setVentas] = useState({});
    const [empleados, setEmpleados] = useState({});
    const [producto, setProducto] = useState({});

    /*-- Filtar tuplas--*/
    const filtarTuplas = ((tupla, estado, fechaInicioFiltro, fechaFinalFiltro) => {
        if (validarFechaEnRango(fechaInicioFiltro, fechaFinalFiltro, tupla["VENTA_FECHA_VENTA"])) {
            if (estado.toUpperCase().includes(asignarEstadoNombre(parseInt(tupla["VENTA_ESTADO_VENTA"])))) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });

    const filtarDatos = (() => {
        classAdmin.venta()
            .then(resultado => {
                if (resultado === false) {
                    throw new Error("No hay resultados almacenados");
                }
                const datosFiltrados = resultado.filter((tupla, index) => {
                    return resultado.indexOf(
                        resultado.find(valor => valor["VENTA_CODIGO_VENTA"] == tupla["VENTA_CODIGO_VENTA"])
                    ) === index;
                });
                const ventas = datosFiltrados.filter((valor) => {
                    return filtarTuplas(valor, estadoFiltro, fechaInicial, fechaFinal);
                });
                const productoVenta = resultado.filter((valor) => {
                    return filtarTuplas(valor, estadoFiltro, fechaInicial, fechaFinal);
                });

                // Organizar los datos por días o meses, dependiendo del rango de fechas
                if (ventas.length > 0) {
                    const ventasPorEstadoFecha = {};
                    ventas.forEach((venta) => {
                        const estado = venta.VENTA_ESTADO_VENTA;
                        const fecha = new Date(venta.VENTA_FECHA_VENTA);
                        const key = fecha.toISOString().substring(0, 10); // Solo consideramos el día o el mes en formato 'YYYY-MM-DD'

                        if (!ventasPorEstadoFecha[estado]) {
                            ventasPorEstadoFecha[estado] = {};
                        }

                        if (ventasPorEstadoFecha[estado][key]) {
                            ventasPorEstadoFecha[estado][key] += parseInt(venta.VENTA_VALOR_TOTAL);
                        } else {
                            ventasPorEstadoFecha[estado][key] = parseInt(venta.VENTA_VALOR_TOTAL);
                        }
                    });

                    const ventasPorEmpleado = {};
                    ventas.forEach((venta) => {
                        const estado = venta.VENTA_ESTADO_VENTA;
                        const key = venta.USUARIO_NOMBRE; // Solo consideramos el día o el mes en formato 'YYYY-MM-DD'

                        if (!ventasPorEmpleado[estado]) {
                            ventasPorEmpleado[estado] = {};
                        }

                        if (ventasPorEmpleado[estado][key]) {
                            ventasPorEmpleado[estado][key] += parseInt(venta.VENTA_VALOR_TOTAL);
                        } else {
                            ventasPorEmpleado[estado][key] = parseInt(venta.VENTA_VALOR_TOTAL);
                        }
                    });

                    const ventasPorProducto = {};
                    productoVenta.forEach((venta) => {
                        const estado = venta.VENTA_ESTADO_VENTA;
                        const key = venta.ITEM_ID_PRODUCTO; // Solo consideramos el día o el mes en formato 'YYYY-MM-DD'

                        if (!ventasPorProducto[estado]) {
                            ventasPorProducto[estado] = {};
                        }

                        if (ventasPorProducto[estado][key]) {
                            ventasPorProducto[estado][key] += parseInt(venta.VENTA_VALOR_TOTAL);
                        } else {
                            ventasPorProducto[estado][key] = parseInt(venta.VENTA_VALOR_TOTAL);
                        }
                    });

                    setVentas(ventasPorEstadoFecha);
                    setProducto(ventasPorProducto);
                    setEmpleados(ventasPorEmpleado);
                }
            }).catch(function (error) {
                return {};
            });
    });

    useEffect(() => {
        // Creamos el gráfico cuando los datos estén listos
        if (Object.keys(ventas).length > 0) {
            const ctx = document.getElementById('salesChart').getContext('2d');

            const labels = Object.keys(ventas[Object.keys(ventas)[0]]); // Usamos las fechas del primer estado para las etiquetas del eje X
            const datasets = [];

            for (const estado in ventas) {
                const nombre = nombreEstado(estado)
                const data = Object.values(ventas[estado]);
                const color = getRandomColor();

                datasets.push({
                    label: nombre,
                    data: data,
                    fill: true,
                    borderColor: color,
                    backgroundColor: `${color}80`,
                    borderWidth: 1,
                    tension: 0.2,
                    pointRadius: 8
                });
            }

            if (chartRef.current.chart) {
                chartRef.current.chart.data.labels = labels;
                chartRef.current.chart.data.datasets = datasets;
                chartRef.current.chart.update();
            } else {
                // Si el gráfico no existe, crea uno nuevo
                chartRef.current.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        } if (Object.keys(ventas).length > 0) {
            const ctx = document.getElementById('salesChartOne').getContext('2d');

            const nombres = [];
            const totales = [];
            const colores = [];

            for (const estado in ventas) {
                const data = Object.values(ventas[estado]);
                const color = getRandomColor()
                nombres.push(nombreEstado(estado));
                colores.push(color);
                totales.push(data.reduce((acc, val) => { return acc + val }, 0));
            }

            const datasets = [{
                label: nombres,
                data: totales,
                fill: true,
                backgroundColor: colores,
                borderWidth: 1,
                tension: 0.2
            }];

            if (chartRefOne.current.chart) {
                chartRefOne.current.chart.data.labels = nombres;
                chartRefOne.current.chart.data.datasets = datasets;
                chartRefOne.current.chart.update();
            } else {
                // Si el gráfico no existe, crea uno nuevo
                chartRefOne.current.chart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: nombres,
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        } if (Object.keys(empleados).length > 0) {
            const ctx = document.getElementById('salesChartTwo').getContext('2d');

            const labels = Object.keys(empleados[Object.keys(empleados)[0]]); // Usamos las fechas del primer estado para las etiquetas del eje X
            const datasets = [];

            for (const estado in empleados) {
                const nombre = nombreEstado(estado)
                const data = Object.values(empleados[estado]);
                const listaColores = data.map((tupla) => {
                    return getRandomColor();
                });
                const listaColoresDegradados = listaColores.map((tupla) => {
                    return `${tupla}80`
                });

                datasets.push({
                    label: nombre,
                    data: data,
                    fill: true,
                    borderColor: listaColores,
                    backgroundColor: listaColoresDegradados,
                    borderWidth: 1,
                    tension: 0.2,
                    pointRadius: 8
                });
            }

            if (chartRefTwo.current.chart) {
                chartRefTwo.current.chart.data.labels = labels;
                chartRefTwo.current.chart.data.datasets = datasets;
                chartRefTwo.current.chart.update();
            } else {
                // Si el gráfico no existe, crea uno nuevo
                chartRefTwo.current.chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        } if (Object.keys(producto).length > 0) {
            const ctx = document.getElementById('salesChartThree').getContext('2d');

            const labels = Object.keys(producto[Object.keys(producto)[0]]); // Usamos las fechas del primer estado para las etiquetas del eje X
            const datasets = [];

            for (const estado in producto) {
                const nombre = nombreEstado(estado)
                const data = Object.values(producto[estado]);
                const color = getRandomColor();

                datasets.push({
                    label: nombre,
                    data: data,
                    fill: true,
                    borderColor: color,
                    backgroundColor: `${color}80`,
                    borderWidth: 1,
                    tension: 0.2,
                    pointRadius: 8
                });
            }

            if (chartRefThree.current.chart) {
                chartRefThree.current.chart.data.labels = labels;
                chartRefThree.current.chart.data.datasets = datasets;
                chartRefThree.current.chart.update();
            } else {
                // Si el gráfico no existe, crea uno nuevo
                chartRefThree.current.chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
    }, [ventas, empleados, producto]);

    const getRandomColor = () => {
        const warmColors = [
            // Azules
            "#007BFF", // Azul brillante
            "#1E90FF", // Azul delfín
            "#6495ED", // Azul cielo
            "#87CEEB", // Azul cielo claro

            // Verdes
            "#008000", // Verde
            "#00FF00", // Verde brillante
            "#32CD32", // Verde lima
            "#7CFC00", // Verde amarillo

            // Morados
            "#800080", // Púrpura
            "#8A2BE2", // Azul violeta
            "#9932CC", // Azul medio violeta
            "#9400D3", // Violeta oscuro

            // Turquesas
            "#20B2AA", // Verde mar
            "#00CED1", // Turquesa medio
            "#40E0D0", // Turquesa
            "#00FFFF", // Cian brillante

            // Grises
            "#808080", // Gris
            "#A9A9A9", // Gris oscuro
            "#C0C0C0", // Gris plata
            "#D3D3D3", // Gris claro
        ];

        const randomIndex = Math.floor(Math.random() * warmColors.length);
        return warmColors[randomIndex];
    };

    return (
        <>
            <FiltrosDatosTabla
                estadoFiltro={setEstadoFiltro}
                filtarDatos={filtarDatos}
                valueFechaInicial={fechaInicial}
                valueFechaFinal={fechaFinal}
                fechaFinal={setFechaFinal}
                fechaInicial={setFechaInicial}>
            </FiltrosDatosTabla>
            <canvas ref={chartRef} id="salesChart" width="800" height="400"></canvas> <br />
            <canvas ref={chartRefOne} id="salesChartOne" width="800" height="400"></canvas> <br />
            <canvas ref={chartRefTwo} id="salesChartTwo" width="800" height="400"></canvas> <br />
            <canvas ref={chartRefThree} id="salesChartThree" width="800" height="400"></canvas> <br />
        </>
    );
};