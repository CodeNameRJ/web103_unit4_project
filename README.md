
# WEB103 Project 4 - *Bolt Bucket*

Submitted by: **Randy Jean**

About this web app: **Bolt Bucket is a custom car builder that allows users to personalize their dream car by selecting exterior color, wheels, interior, and trim. The price updates dynamically as options are selected. Users can save, view, edit, and delete their custom cars. The app is connected to a PostgreSQL database hosted on Render.**

Time spent: **14** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view multiple features of the `CustomItem` they can customize (wheels, exterior, interior, trim)**
- [x] **Each customizable feature has multiple options to choose from**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` changes dynamically as different options are selected.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] Dynamic price calculation using a separate utilities file
- [x] Validation preventing Luxury trim with Cloth interior combination

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://i.imgur.com/Kp41VkU.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

[Watch the full walkthrough GIF](https://i.imgur.com/Kp41VkU.gif)


GIF created with Kap

## Notes

Challenges encountered while building the app:
- Configuring CORS between the Vite dev server and Express backend required setting up a proxy in vite.config.js
- Setting up dotenv to correctly load environment variables from the correct path when running reset.js
- Managing React state for dynamic price calculation across multiple feature selections

## License

Copyright [2026] [Randy Jean]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.