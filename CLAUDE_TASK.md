# Leather Clinic React Rebuild Task

You are rebuilding Leather Clinic as a clean React + Vite landing page.

## Important

Do not edit `/var/www/leatherclinic.org` live root directly.

Work only in:

`/var/www/leatherclinic-react`

Use old live folder only as visual reference and asset source:

`/var/www/leatherclinic.org`

Deploy preview only with:

`./scripts/deploy-preview.sh`

Preview URL:

`https://leatherclinic.org/react-preview/`

## Goal

Rebuild the current fragile Weblium HTML export into a fast, clean, maintainable React + Vite landing page.

Preserve the premium dark Leather Clinic visual direction:
- black/dark background
- red accent
- bold typography
- rounded CTA buttons
- clean conversion-focused sections
- mobile-first responsive design

Do not copy Weblium wrappers. Do not patch old HTML.

## Business details

Phone:
+1 843-855-8272

Phone link:
tel:+18438558272

Email:
info@leatherclinic.org

Address:
2068 Clark Ave, Raleigh, NC 27605, United States

Location:
Raleigh, NC 27605

Service area:
Raleigh and surrounding areas

## Page structure

Header:
- Leather Clinic Raleigh, NC
- Services
- Work
- Reviews
- Book
- phone CTA

Hero:
Headline:
Leather Recoloring & Restoration

Subheadline:
Mobile leather repair, furniture recoloring, car interior restoration, cushion refilling and upholstery services.

Location text:
Based in Raleigh, NC 27605
Mobile Service – We Come to You
Proudly Serving Raleigh and surrounding areas

CTA:
Request Now
Call Us

Services:
1. Auto Interior Color Restoration
We recolor and restore worn car interiors — seats, armrests, and more. Fixing fading, scuffs, and scratches.

2. Leather Couch Recoloring
We recolor and restore worn leather couches. Fixing fading, scratches, and worn areas.

3. Cushion Refilling
We refill cushions for sofas and chairs to improve comfort, shape, and support.

4. Stitching & Reupholstery
We repair stitching and can reupholster cushions and dining chairs with new material if needed.

Work / gallery:
Use only real repair/work images from `/var/www/leatherclinic.org`.
Do not use:
- logo screenshots
- website screenshots
- blurred duplicate logos
- random background images
- old irrelevant graphics

Repair list:
Title:
Upholstery and Leather Repair

Text:
Rely on our restoration services to maintain the beauty and comfort of your furniture and car interiors.

Bullets:
✅ Leather furniture repair and recoloring
✅ Fixing scratches, tears, and worn areas
✅ Cushion refilling for sofas and chairs
✅ Stitching and reupholstery
✅ Car interior repair and recoloring

Stats:
500+ Projects Completed
4 Years of Experience

About:
Title:
Your furniture and interior deserve a fresh look.

Text:
Welcome to Leather Clinic LLC — your go-to for leather recoloring and restoration.

We restore color on worn leather furniture and car interiors. We work on couches and car seats, fixing fading, scratches, and worn areas to bring the color back and even everything out.

We also offer cushion refilling to improve comfort and shape, and can reupholster cushions and dining chairs with new material if needed.

Simple, clean work — done right.

Reviews:
1. Ann Vetter
Leather Clinic did a fantastic job! My furniture looks like new. They were respectful, pleasant and honest. I was comfortable with them being in my home. I would recommend them.

2. Shawn Handfinger
I have a large sectional leather sofa that is 23 years old. He was able to correct all issues, polished and cleaned the entire sofa, and it really looks like a brand new sofa. Highly recommend.

3. Mz. Copeland
I had a great experience with The Leather Clinic. They repaired the leather inside my car, and it looks brand new again. They came right to my home and finished everything in about two hours.

4. Laura Barbur
Andy did an amazing job refinishing deep cat scratches on our white leather couch. He worked quickly and diligently onsite, and our couch looks like new.

5. Vaishali Deshpande
Good service, they fixed our sofa and made it firm. They also polished the sofa at no extra cost. I highly recommend.

6. Gina K
Andy repaired and recolored a couch and recliner for me. He was extremely kind, helpful, and efficient. My pieces now look and feel brand new.

Quote form:
Title:
Get a Free Quote

Text:
Send photos and details. We will contact you shortly.

Fields:
Name
Phone number*
Email*
Zip code
Comments
Upload your files
Request a quote

Form behavior:
POST multipart FormData to `/api/leatherclinic`.

Must append:
- time
- page_url
- meta
- fields as JSON string
- file1, file2, file3

Fields JSON structure must be compatible with existing n8n:

{
  "short_text": {
    "title": "Name",
    "type": "short_text",
    "value": name
  },
  "contactForm_phoneNumber": {
    "title": "Phone",
    "type": "phone",
    "value": phone
  },
  "contactForm_email": {
    "title": "Email",
    "type": "email",
    "value": email
  },
  "11ce3fc7-015d-4c01-9976-1b6949db3619": {
    "title": "Zip code",
    "type": "short_text",
    "value": zip
  },
  "a5f36c2a-78b4-4f4b-b8f7-c8c81b8b0189": {
    "title": "Comments",
    "type": "long_text",
    "value": comments
  }
}

Success message:
Sent successfully ✅

Error message:
Could not send. Please call or text us.

Footer:
Phone Number:
+1 843-855-8272

Email:
info@leatherclinic.org

Address:
2068 Clark Ave, Raleigh, NC 27605, United States

Working Hours:
Monday - Friday: 8:00 AM - 7:00 PM
Saturday: 9:00 AM - 5:00 PM

## Remove completely

Remove:
- Follow us section
- Instagram subscribe section
- old blog/news/articles
- old Why Choose Us block
- old broken Before/After layout
- old Recliner Mechanism Repair
- old Car Interior Repair wording
- 120+ Satisfied Customers
- 1000+ Leather Repair
- Myrtle Beach
- South Carolina
- Turnworth address
- old phone 267-379-3167

## SEO

Set:
title:
Leather Clinic Raleigh | Leather Recoloring & Restoration

description:
Mobile leather repair, furniture recoloring, car interior restoration, cushion refilling and upholstery services in Raleigh, NC.

Add:
- canonical https://leatherclinic.org/
- Open Graph title/description
- LocalBusiness JSON-LD

## Verification

After implementation run:

npm run build

Then:

./scripts/deploy-preview.sh

Check preview:
- contains Raleigh
- contains 843-855-8272
- contains Get a Free Quote
- contains What Our Customers Say
- does not contain Myrtle Beach
- does not contain South Carolina
- does not contain Turnworth
- no empty sections
- mobile responsive
- form still posts to /api/leatherclinic
