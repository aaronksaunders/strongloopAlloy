StrongLoop Alloy Wrapper - Work In Progress, NOT Complete
===

Wrapping StrongLoop to make it play nicer with  specifically Appcelerator Titanium Alloy. 
----

Alloy using Backbone models for persistence and thes models relay on a sync adapter to interact with data store. This sample code here utilizizes a [REST API Alloy Sync Adapter](https://github.com/aaronksaunders/strongloopAlloy/blob/master/app/lib/alloy/sync/restapi.js) for interfacing with StrongLoop.

We have created a StrongLoop Model which is extended to support specific user functions and specific StrongLoop APIs for data query. These built-in queries are provided to the user through the model and collection creation process; for example.

    collection = SL.createStrongLoopCollection("cars");
    Ti.API.info("Number of cars " + collection.count());


When working with user's all you will need to do is name the Model `users` and the StongLoopLib will do all of the rest of the work of associating the user specific API calls

~~~~
var userModel = SL.createStrongLoopModel("users");
userModel.login({
    "email" : "foo@bar.com",
    "password" : "bar"
}).then(function(_data) {
    Ti.API.info('userModel.login: _data ' + JSON.stringify(_data, null, 2));
});
~~~~


Finally also notice the use of integrated promises [http://documentup.com/kriskowal/q/](http://documentup.com/kriskowal/q/), to avoid the callback hell you usually get when working with some asynchronous libraries.



Setting Up Some Sample Data
---

These instructions assume that you have already set up and installed strong by following the documentaton provided on there website.


For the test application to run, you will need to create a sample user through the console; see image below

![UI for Creating the User in StrongLoop Console](https://raw.github.com/aaronksaunders/strongloopAlloy/master/readme.images/createtheuser_screenshot.png)

For the cars collection that we are using in the application, the command to create the collection is

~~~~
slc lb model car
~~~~

And the screenshot below shows what the console looks like when you manually add the car to the datastore through the console

![UI for Creating the Car in StrongLoop Console](https://raw.github.com/aaronksaunders/strongloopAlloy/master/readme.images/createacar_screenshot.png)


----------------------------------
Copyright (c) 2013-2014 Aaron K. Saunders

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

