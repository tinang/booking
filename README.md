# Reservation App
Just a basic reservation app

## Deployment

```
git clone git@github.com:tinang/booking.git
npm install
bower install
gulp webpack
gulp styles
gulp templates
gulp fonts
gulp copy
gulp dummy
gulp serve

```

## Production?

Just copy `dist` folder to your root path

## Demo

Check [here](http://tinang.github.io/booking/demo/ "Demo")

## More Detail

1. Basic features
⋅⋅* Render booking data
⋅⋅* Make a new reservation
⋅⋅* **Missing drag and drop**
2. What's inside?
"Production" has 4 main files:
..* `index.html` is main template file
⋅⋅* `app.js` is the main javascript file. `gulp webpack` will minimize all javascript files to `app.js` in "production"
..* The same for `component.scss`, this file includes all needed css files and compile to `components.css` in "production"
..* All templates (html file) will be compiled to `templates.js`
3. Planning for UI fine-grained booking
Currently I don't have any specific idea for this feature. In demo, I just set specific color for each booking type. Distance between `start-date` and `end-date` of a booking will be calculated by "day" unit, 1 day is 100% width of one column. We can use the same way for half-day (50% width) and per-hours `hours*100/24`% width

Have done! :)