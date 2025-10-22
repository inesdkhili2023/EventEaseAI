export const stripeConfig = {
  publishableKey: 'pk_test_51SL22pIg8S0OpQmZFVJ7fH9h0VJ90FvxtcZxAN7f3ekYWXGZ5a3PPsXSQzwmMcthc2J736MNFiL1FFLIlhKUo9Es00IHGOLiaD',
  webhookSecret: 'whsec_66846056b56a30f9ccad3094388eac866d7b175adbd1e5a95cedc07c38685b24',
  currency: 'TND',
  country: 'TN',
  supportedPaymentMethods: [
    'card',
    'bank_transfer',
    'mobile_money'
  ],
  businessInfo: {
    name: 'Votre Entreprise',
    supportEmail: 'support@votreentreprise.com',
    supportPhone: '+216 XX XXX XXX',
    businessHours: 'Lun-Ven: 9h-18h',
    timezone: 'Africa/Tunis'
  }
};
