// MINHA SOLUÇÃO
/*
class ValidandoCPF {
  constructor(cpfEnviado) {
    this.cpfLimpo = cpfEnviado.replace(/\D+/g, "");
  }

  valida() {
    if(!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCPF = cpfParcial + digito1 + digito2;
    return novoCPF === this.cpfLimpo;
  }

  criaDigito(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
      ac += regressivo * Number(val);
      regressivo--;
      return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? "0" : String(digito);
  }
  isSequencia() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
  }
}
const cpf = new ValidandoCPF("705.484.450-52");
if (cpf.valida()) {
  console.log("VÁLIDO");
} else {
  console.log("INVÁLIDO");
}
*/

// Quando NÃO É USADA a palavra THIS em um MÉTODO você pode TRANSFORMAR ele em STATIC
// Quando você transformar a classe em STATIC no lugar da palavra THIS deve usar usado o NOME DA CLASSE para executar o método

class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ""),
    });
  }

  isSequencia() {
    return (
      this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    );
  }

  geraNovoCpf() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos); // No lugar de THIS foi usado no nome da Classe, já que o método geraDigito é uma classe estática
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1); // No lugar de THIS foi usado no nome da Classe, já que o método geraDigito é uma classe estática
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  // Classe estática porque não é preciso usar THIS dentro DELA -> (NÃO É PRECISO NADA DA INSTÂNCIA DENTRO DELA)
  static geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for (let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }
    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : "0";
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;
    this.geraNovoCpf();
    return this.novoCPF === this.cpfLimpo;
  }
}

// let validaCpf = new ValidaCPF("705.484.450-52");
// // validaCpf = new ValidaCPF("999.999.999-99");

// if (validaCpf.valida()) {
//   console.log("CPF VÁLIDO");
// } else {
//   console.log("CPF INVÁLIDO");
// }
