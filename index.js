const axios = require('axios')

exports.LiberalizeNodeJs = class {
    constructor(privateKey, environment="prod") {
        switch (environment) {
            case "prod":
                this.paymentApi = "https://payment.api.liberalize.io/payments"
                this.customerApi = "https://customer.api.liberalize.io"
                break;
            case "staging":
                this.paymentApi = "https://payment.api.staging.liberalize.io/payments"
                this.customerApi = "https://customer.api.staging.liberalize.io"
                break;
            case "dev":
                this.paymentApi = "https://payment.api.dev.liberalize.io/payments"
                this.customerApi = "https://customer.api.dev.liberalize.io"
                break;
            case "local":
                this.paymentApi = "https://payment.api.dev.liberalize.io/payments"
                this.customerApi = "https://customer.api.dev.liberalize.io"
            default:
                break;
        }
        let buff = new Buffer(privateKey + ":");
        let base64data = buff.toString('base64');
        this.privateKey = base64data;
    }

    async createPayment(requestBody, libService="elements") {
        let validatedRequest = {};
        try {
            for (const property in requestBody) {
                switch (property) {
                    case "amount":
                        validatedRequest["amount"] = parseInt(requestBody["amount"].toString())
                        break;
                    case "source":
                        const sourceArr = requestBody["source"].split('-')
                        if (sourceArr[0] === 'card') {
                            validatedRequest["source"] = `lib:customer:paymentMethods/${requestBody["source"]}`
                        } else {
                            validatedRequest["source"] = requestBody["source"]
                        }
                        break;
                    default:
                        validatedRequest[property] = requestBody[property]
                        break;
                }
            }
            var response = await axios.post(
                `${this.paymentApi}`,
                validatedRequest,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${this.privateKey}`,
                        "x-lib-pos-type": libService
                    }
                }
            )
            return response.data
        } catch (err) {
            return err
        }
    }

    async authorizePayment(requestBody, libService="elements") {
        let validatedRequest = {};
        let paymentId = ""
        try {
            for (const property in requestBody) {
                switch (property) {
                    case "source":
                        const sourceArr = requestBody["source"].split('-')
                        if (sourceArr[0] === 'card') {
                            validatedRequest["source"] = `lib:customer:paymentMethods/${requestBody["source"]}`
                        } else {
                            validatedRequest["source"] = requestBody["source"]
                        }
                    case "paymentId":
                        paymentId = `${requestBody["paymentId"]}`
                    default:
                        validatedRequest[property] = requestBody[property]
                        break;
                }
            }
            var response = await axios.post(
                `${this.paymentApi}/${paymentId}/authorizations`,
                validatedRequest,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${this.privateKey}`,
                        "x-lib-pos-type": libService
                    }
                }
            )
            return response.data
        } catch (err) {
            return err
        }
    }

    async capturePayment(requestBody, libService="elements") {
        let validatedRequest = {};
        let paymentId = ""
        try {
            for (const property in requestBody) {
                switch (property) {
                    case "amount":
                        validatedRequest["amount"] = `${requestBody["amount"]}`
                    case "paymentId":
                        paymentId = `${requestBody["paymentId"]}`
                    default:
                        break;
                }
            }
            var response = await axios.post(
                `${this.paymentApi}/${paymentId}/captures`,
                validatedRequest,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${this.privateKey}`,
                        "x-lib-pos-type": libService
                    }
                }
            )
            return response.data
        } catch (err) {
            return err
        }
    }

    async refundPayment(requestBody, libService="elements") {
        let validatedRequest = {};
        let paymentId = ""
        try {
            for (const property in requestBody) {
                switch (property) {
                    case "amount":
                        validatedRequest["amount"] = `${requestBody["amount"]}`
                    case "paymentId":
                        paymentId = `${requestBody["paymentId"]}`
                    default:
                        break;
                }
            }
            var response = await axios.post(
                `${this.paymentApi}/${paymentId}/refunds`,
                validatedRequest,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${this.privateKey}`,
                        "x-lib-pos-type": libService
                    }
                }
            )
            return response.data
        } catch (err) {
            return err
        }
    }

    async voidPayment(requestBody, libService="elements") {
        let validatedRequest = {};
        let paymentId = ""
        try {
            for (const property in requestBody) {
                switch (property) {
                    case "paymentId":
                        paymentId = `${requestBody["paymentId"]}`
                    default:
                        break;
                }
            }
            var response = await axios.post(
                `${this.paymentApi}/${paymentId}/voids`,
                validatedRequest,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${this.privateKey}`,
                        "x-lib-pos-type": libService
                    }
                }
            )
            return response.data
        } catch (err) {
            return err
        }
    }

    async getPayment(paymentId, libService="elements") {
        try {
            var response = await axios.get(
                `${this.paymentApi}/${paymentId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${this.privateKey}`,
                        "x-lib-pos-type": libService
                    }
                }
            )
            return response.data
        } catch (err) {
            return err
        }
    }
}