<?php

return [

   'paths' => ['api/*', 'sanctum/csrf-cookie'],

   'allowed_methods' => ['*'],

   'allowed_origins' => [
      'http://localhost:24678',              // untuk Nuxt dev
      'http://localhost:3000',              // untuk Nuxt dev
      'https://course.ciefamily.com',       // untuk Nuxt production
      'http://localhost:3000',
      'http://192.168.0.101:3000'
   ],

   'allowed_origins_patterns' => [],

   'allowed_headers' => ['*'],

   'exposed_headers' => [],

   'max_age' => 0,

   'supports_credentials' => true,

];
