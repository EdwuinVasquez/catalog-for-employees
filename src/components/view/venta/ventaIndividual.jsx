/*-- Estilos --*/
import '../../style/venta/ventaIndividual.css';

/*-- librerias --*/
import { React } from "react";
import { logo } from '../logos/img';
import { formatearNumero } from '../../../backend/funcioneGenerales';

export function VentaIndividual({ lista }) {
  /*-- Generar lista de items --*/
  const listarItems = ((lista) => {
    try {
      return lista.map((tupla) => {
        return <tr className="item" key={tupla["ITEM_NOMBRE_ITEM"]}>
          <td>
            <p>
              <b>{tupla["ITEM_ID_PRODUCTO"]}</b>
              {tupla["ITEM_NOMBRE_ITEM"]} <br />
              <b>{tupla["ITEM_CANTIDAD"]}Und</b>
              x ${formatearNumero(tupla["ITEM_VALOR_DESCUENTO"])}
            </p>
          </td>
          <td>
            ${formatearNumero(tupla["ITEM_VALOR_TOTAL"])}
          </td>
        </tr>
      })
    } catch (error) {
      return <></>
    }
  })

  return (
    <>
      <div className="invoice-box">
        <table cellPadding="0" cellSpacing="0">

          <tr className="top">
            <td colSpan="2">
              <table>
                <tr>
                  <td className="title">
                    <img src={logo}
                      style={{
                        width: "100%",
                        maxWidth: "100px",
                        height: "120px",
                        borderRadius: "0px"
                      }} />
                  </td>
                  <td>
                    Venta #{lista[0]["VENTA_CODIGO_VENTA"]}<br />
                    CC: {lista[0]["VENTA_CEDULA_USUARIO"]} <br />
                    Nombre: {lista[0]["USUARIO_NOMBRE"]}<br />
                    Fecha: {lista[0]["VENTA_FECHA_VENTA"]}<br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan="2">
              <table>
                <tr>
                  <td>
                    info@rimoplasticas.com<br />
                    Telefono: 3216766291<br />
                    Cuenta <b>corriente</b> Bancolombia: 24350727276<br />
                    <b>Ten presente el número de solicitud cuando quieras realizar el pago</b><br />
                    <b>Puedes realizar el pago en efectivo en recepción o realizar una consignación a través de la cuenta corriente Bancolombia "24350727276" durante los días hábiles. No olvides enviar el  comprobante de transferencia a alguna de nuestras líneas de conctacto para confirmar tu pago ¡Gracias!</b><br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="details">
            <td>
            </td>

            <td>
            </td>
          </tr>

          <tr className="heading">
            <td>
              Producto
            </td>
            <td>
              Valor
            </td>
          </tr>

          {listarItems(lista)}

          <tr className="total">
            <td></td>
            <td>
              Total: ${formatearNumero(lista[0]["VENTA_VALOR_TOTAL"])}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};