# Nathaniel Ribeiro — site de cifras

Site estático inicial com:
- catálogo pesquisável;
- filtros;
- página individual de produto;
- botões separados para Mercado Pago e PayPal;
- estrutura preparada para Google Drive;
- layout responsivo para desktop e celular.

## Como editar produtos

Abra `products.json`. Cada objeto representa uma cifra.

Substitua:
- `mercadopago` pelo link real do Mercado Pago;
- `paypal` pelo link real do PayPal;
- `drive` pelo link da pasta do Google Drive.

Para adicionar uma cifra, copie um objeto existente, altere os dados e coloque uma nova imagem em `assets/`.

## Importante

A primeira versão deliberadamente não implementa entrega automática. Os botões de pagamento apontam para os gateways e os arquivos permanecem no Google Drive. A automação da entrega pode ser adicionada depois, quando a loja estiver validada.

## Publicação

O projeto pode ser hospedado como site estático, por exemplo no GitHub Pages, Cloudflare Pages ou Netlify.
