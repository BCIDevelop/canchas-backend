import models from "../models";
import EmailServer from "../providers/mail.provider";
import { validateEmail } from "../helpers/validateRequest";
import axios, { AxiosError } from "axios";
import {
  PagosNotFound,
  TokenNotObtained,
} from "../exceptions/pagos.exceptions";

const getTokenSecurity = async () => {
  const encodedCredentials = Buffer.from(
    `${process.env.USER_NUIBIZ}:${process.env.PASSWORD_NUIBIZ}`
  ).toString("base64");
  const config = {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `${process.env.BASE_URL}/api.security/v1/security`,
    config
  );
  const token = response.data;
  return token;
};

class PagoContoller {
  constructor() {
    this.model = models.pagos;
  }

  async getPagoById(req, res) {
    console.log("entre");
    try {
      const id = req.params.id;
      const response = await this.model.findOne({ where: { id } });
      if (!response) throw new PagosNotFound();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }

  async getSessionToken(req, res) {
    /* 1er paso getSecurityInfo */

    try {
      const token = await getTokenSecurity();
      /* Verificamos si el token llego correctamente */
      if (token) {
        /* Si existe el token lo guardamos para terminar el flujo de pago */
        const pago = await this.model.create({ security_token: token });
        /* Procedemos a generar el session token */
        const sessionHeaders = {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const data = {
          channel: "web",
          amount: 10.5,
          antifraud: {
            clientIp: "24.252.107.29",
            merchantDefineData: {
              MDD4: "integraciones@niubiz.com.pe",
              MDD32: "JD1892639123",
              MDD75: "Registrado",
              MDD77: 458,
            },
          },
        };
        const sessionResponse = await axios.post(
          `${process.env.ECOMMERCE_URL}/token/session/${process.env.MERCHANT_ID}`,
          data,
          sessionHeaders
        );
        return res
          .status(200)
          .json({ ...sessionResponse.data, purchaseNumber: pago.id } || null);
      } else throw new TokenNotObtained();
    } catch (error) {
      if (error instanceof AxiosError) {
        return res.status(error.response?.status || 500).json({
          message: error.response?.statusText || error.message,
        });
      }
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }

  async getTransactionToken(req, res) {
    console.log(req.body.transactionToken);
    const id = req.query.id;
    try {
      const record = await this.model.findOne({ where: { id } });
      if (!record) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
      const transactionHeaders = {
        headers: {
          "Content-Type": "application/json",
          Authorization: record.security_token,
        },
      };
      const data = {
        channel: "web",
        captureType: "manual",
        countable: true,
        order: {
          tokenId: req.body.transactionToken,
          purchaseNumber: id,
          amount: 10.5,
          currency: "PEN",
        },
      };
      const transactionResponse = await axios.post(
        `${process.env.AUTHORIZATION_URL}/${process.env.MERCHANT_ID}`,
        data,
        transactionHeaders
      );
      /* Si es exitosa procedemos a crear la boleta o factura */
      console.log(transactionResponse.data);
      if (transactionResponse.status === 200) {
        return res.redirect(
          `${process.env.CLIENT_URL}/payment/success?id=${id}`
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return res.status(error.response?.status || 500).json({
          message: error.response?.statusText || error.message,
        });
      }
      return res.status(error?.code || 500).json({ message: error.message });
    }
  }
}
export default PagoContoller;
