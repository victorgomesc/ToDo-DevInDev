echo 'Check for liting errors and run tests before commiting...'
npm run check:fixgit ||
(echo 'Liting errors or run testes failed. Please fix commiting' && exit 1)

npm run check ||
(echo 'Liting errors or run testes failed. Please fix commiting' && exit 1)

echo 'Done'