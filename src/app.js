import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      exchangeRates: {},
      rate: 1,
      firstRate: 1,
      secondRate: 1,
      currency: null,
      firstCurrency: null,
      secondCurrency: null,
      amount: 1,
      otherAmount: 1,
      doubleConvAmount: 1
    },
    mounted: function() {
      this.fetchExchangeRates()
    },
    computed: {
      convertedAmount: function() {
        return (this.amount * this.rate).toFixed(2)
      },
      convertedOtherAmount: function() {
        return (this.otherAmount / this.rate).toFixed(2)
      },
      doubleConvertedAmount: function() {
        return (this.doubleConvAmount * this.firstRate / this.secondRate).toFixed(2)
      }
    },
    methods: {
      fetchExchangeRates: function () {
        console.log("loading exchange rates");
        fetch("https://api.exchangeratesapi.io/latest")
        .then(response => response.json())
        .then(exchangeRates => this.exchangeRates = exchangeRates)
      },
      setRate: function() {
        this.rate = this.exchangeRates.rates[this.currency]
      },
      setFirstRate: function() {
        this.firstRate = this.exchangeRates.rates[this.firstCurrency]
      },
      setSecondRate: function() {
        this.secondRate = this.exchangeRates.rates[this.secondCurrency]
      }
    }
  });
});
