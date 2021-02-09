# Host on firebase log

a log that create host on firebase for the angular app.

PS C:\Users\Documents\mean_app> ng build --prod
√ Browser application bundle generation complete.
√ Copying assets complete.
√ Index html generation complete.

Initial Chunk Files               | Names         |      Size
main.e9fe67741db59213cec3.js      | main          | 449.06 kB
styles.0e281ca8754947d1b1fc.css   | styles        |  70.88 kB

                                  | Initial Total | 557.39 kB

Build at: 2021-02-08T23:30:08.583Z - Hash: 9953cd0abe75b7dcfe7c - Time: 32745msPS C:\Users\Documents\mean_app> cd .\dist\
PS C:\Users\Documents\mean_app\dist> ls


    目录: C:\Users\Documents\mean_app\dist


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----         2021/2/8     19:30                simple-post


PS C:\Users\Documents\mean_app\dist> cd .\simple-post\
PS C:\Users\Documents\mean_app\dist\simple-post> ls


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         2021/2/8     19:30          15609 3rdpartylicenses.txt
-a----         2021/2/8     15:33            948 favicon.ico
-a----         2021/2/8     19:30           6900 index.html
-a----         2021/2/8     19:30         459836 main.e9fe67741db59213cec3.js  
-a----         2021/2/8     19:30          36864 polyfills.8c151b8375e767ff858 
                                                 f.js
-a----         2021/2/8     19:30           1485 runtime.0e49e2b53282f40c8925. 
                                                 js
-a----         2021/2/8     19:30          72586 styles.0e281ca8754947d1b1fc.c 
                                                 ss


PS C:\Users\Documents\mean_app\dist\simple-post> cd ..
PS C:\Users\Documents\mean_app\dist> cd ..
PS C:\Users\Documents\mean_app> firebase init

     ######## #### ########  ######## ########     ###     ######  ########    
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######      
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########    

You're about to initialize a Firebase project in this directory:

  C:\Users\Documents\mean_app

? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection)

Error: Must select at least one feature. Use SPACEBAR to select features, or provide a feature with firebase init [feature_name]
PS C:\Users\Documents\mean_app> firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##      
     ######    ##  ########  ######   ########  #########  ######  ######      
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########    

You're about to initialize a Firebase project in this directory:

  C:\Users\Documents\mean_app

? Are you ready to proceed? **Yes**
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. **Hosting: Configure and deploy Firebase Hosting sites**

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: **Use an existing project**
? Select a default Firebase project for this directory: **simple-post-4b01f (simple-post)**

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that  
will contain Hosting assets to be uploaded with firebase deploy. If you        
have a build process for your assets, use your build's output directory.       

? What do you want to use as your public directory? **dist/simple-post**
? Configure as a single-page app (rewrite all urls to /index.html)? **Yes**        
? Set up automatic builds and deploys with GitHub? **No**
? File dist/simple-post/index.html already exists. Overwrite? **No**
i  Skipping write of dist/simple-post/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!

=== Deploying to 'simple-post-4b01f'...

i  deploying hosting
i  hosting[simple-post-4b01f]: beginning deploy...
i  hosting[simple-post-4b01f]: found 7 files in dist/simple-post
+  hosting[simple-post-4b01f]: file upload complete
+  hosting[simple-post-4b01f]: version finalized
i  hosting[simple-post-4b01f]: releasing new version...
+  hosting[simple-post-4b01f]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/simple-post-4b01f/overview
Hosting URL: https://simple-post-4b01f.web.app
