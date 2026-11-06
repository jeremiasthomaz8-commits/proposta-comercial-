# Proposta comercial — Jeremias Thomaz

Apresentação em português com quatro seções. HTML, CSS e JavaScript sem dependências de execução.

## Abrir
Abra `dist/index.html` no navegador ou execute `node preview.cjs` e acesse http://127.0.0.1:4173.

## Personalizar
Edite `dist/config.js`:
- `clientLogo`: foto do cliente na capa, atualmente `assets/foto-cliente.png`.
- `clientName`: nome do cliente.
- `whatsappUrl`: endereço real, por exemplo `https://wa.me/55DDDNUMERO`.
- `designerLogo`: marca da parceria na capa.

Sem WhatsApp configurado, o botão abre um aviso de contato disponível em breve. A foto do cliente aparece ao lado da marca de Jeremias na capa.

## Arquivos
- `dist/index.html`: conteúdo e estrutura.
- `dist/styles.css`: design responsivo e movimento reduzido.
- `dist/app.js`: navegação, progresso e contato.
- `dist/assets`: foto e logo fornecidas e fonte Sora local.

Foto da seção Quem sou eu: retrato em cores fornecido pelo usuário, em assets/jeremias-retrato.png.

## Verificação
Sintaxe JavaScript validada com Node. Prévia HTTP respondeu 200. A inspeção visual foi bloqueada por falha de inicialização da ferramenta de navegador.
