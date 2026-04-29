#!/usr/bin/env bash
set +H

cd /var/www/leatherclinic-react

npm run build >/tmp/lc-react-build.log 2>&1

rm -rf /var/www/leatherclinic.org/react-preview
mkdir -p /var/www/leatherclinic.org/react-preview
cp -a dist/. /var/www/leatherclinic.org/react-preview/

printf 'PREVIEW=%s\n' 'https://leatherclinic.org/react-preview/'
printf 'contains_raleigh=%s\n' "$(curl -ks https://leatherclinic.org/react-preview/ | rg -o 'Raleigh' | wc -l | tr -d ' ')"
printf 'contains_phone=%s\n' "$(curl -ks https://leatherclinic.org/react-preview/ | rg -o '843-855-8272' | wc -l | tr -d ' ')"
printf 'old_myrtle=%s\n' "$(curl -ks https://leatherclinic.org/react-preview/ | rg -o 'Myrtle Beach|South Carolina|Turnworth' | wc -l | tr -d ' ')"
