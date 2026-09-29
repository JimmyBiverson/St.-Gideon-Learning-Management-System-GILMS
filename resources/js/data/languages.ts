const languages = [
   {
      code: 'ab',
      name: 'Abkhaz',
      nativeName: 'аҧсуа',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇪'
   },
   {
      code: 'aa',
      name: 'Afar',
      nativeName: 'Afaraf',
      direction: 'ltr',
      reviewed: true,
      flag: '🇩🇯'
   },
   {
      code: 'af',
      name: 'Afrikaans',
      nativeName: 'Afrikaans',
      direction: 'ltr',
      reviewed: true,
      flag: '🇿🇦'
   },
   {
      code: 'ak',
      name: 'Akan',
      nativeName: 'Akan',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇭'
   },
   {
      code: 'sq',
      name: 'Albanian',
      nativeName: 'Shqip',
      direction: 'ltr',
      reviewed: true,
      flag: '🇦🇱'
   },
   {
      code: 'am',
      name: 'Amharic',
      nativeName: 'አማርኛ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇹'
   },
   {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      direction: 'rtl',
      reviewed: true,
      flag: '🇸🇦'
   },
   {
      code: 'an',
      name: 'Aragonese',
      nativeName: 'Aragonés',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇸'
   },
   {
      code: 'hy',
      name: 'Armenian',
      nativeName: 'Հայերեն',
      direction: 'ltr',
      reviewed: true,
      flag: '🇦🇲'
   },
   {
      code: 'as',
      name: 'Assamese',
      nativeName: 'অসমীয়া',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'av',
      name: 'Avaric',
      nativeName: 'авар мацӀ, магӀарул мацӀ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇺'
   },
   {
      code: 'ae',
      name: 'Avestan',
      nativeName: 'avesta',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇷'
   },
   {
      code: 'ay',
      name: 'Aymara',
      nativeName: 'aymar aru',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇴'
   },
   {
      code: 'az',
      name: 'Azerbaijani',
      nativeName: 'azərbaycan dili',
      direction: 'ltr',
      reviewed: true,
      flag: '🇦🇿'
   },
   {
      code: 'bm',
      name: 'Bambara',
      nativeName: 'bamanankan',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇱'
   },
   {
      code: 'ba',
      name: 'Bashkir',
      nativeName: 'башҡорт теле',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇺'
   },
   {
      code: 'eu',
      name: 'Basque',
      nativeName: 'euskara, euskera',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇺'
   },
   {
      code: 'be',
      name: 'Belarusian',
      nativeName: 'Беларуская',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇪'
   },
   {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇩'
   },
   {
      code: 'bh',
      name: 'Bihari',
      nativeName: 'भोजपुरी',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'bi',
      name: 'Bislama',
      nativeName: 'Bislama',
      direction: 'ltr',
      reviewed: true,
      flag: '🇻🇺'
   },
   {
      code: 'bs',
      name: 'Bosnian',
      nativeName: 'bosanski jezik',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇦'
   },
   {
      code: 'br',
      name: 'Breton',
      nativeName: 'brezhoneg',
      direction: 'ltr',
      reviewed: true,
      flag: '🇫🇷'
   },
   {
      code: 'bg',
      name: 'Bulgarian',
      nativeName: 'български език',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇬'
   },
   {
      code: 'my',
      name: 'Burmese',
      nativeName: 'ဗမာစာ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇲'
   },
   {
      code: 'ca',
      name: 'Catalan; Valencian',
      nativeName: 'Català',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇸'
   },
   {
      code: 'ch',
      name: 'Chamorro',
      nativeName: 'Chamoru',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇺'
   },
   {
      code: 'ce',
      name: 'Chechen',
      nativeName: 'нохчийн мотт',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇺'
   },
   {
      code: 'ny',
      name: 'Chichewa',
      nativeName: 'chiCheŵa',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇼'
   },
   {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文 (Zhōngwén)',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇳'
   },
   {
      code: 'cv',
      name: 'Chuvash',
      nativeName: 'чӑваш чӗлхи',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇺'
   },
   {
      code: 'kw',
      name: 'Cornish',
      nativeName: 'Kernewek',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇧'
   },
   {
      code: 'co',
      name: 'Corsican',
      nativeName: 'corsu',
      direction: 'ltr',
      reviewed: true,
      flag: '🇫🇷'
   },
   {
      code: 'cr',
      name: 'Cree',
      nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇦'
   },
   {
      code: 'hr',
      name: 'Croatian',
      nativeName: 'hrvatski',
      direction: 'ltr',
      reviewed: true,
      flag: '🇭🇷'
   },
   {
      code: 'cs',
      name: 'Czech',
      nativeName: 'česky, čeština',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇿'
   },
   {
      code: 'da',
      name: 'Danish',
      nativeName: 'dansk',
      direction: 'ltr',
      reviewed: true,
      flag: '🇩🇰'
   },
   {
      code: 'dv',
      name: 'Divehi',
      nativeName: 'ދިވެހި',
      direction: 'rtl',
      reviewed: true,
      flag: '🇲🇻'
   },
   {
      code: 'nl',
      name: 'Dutch',
      nativeName: 'Nederlands',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇱'
   },
   {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      direction: 'ltr',
      reviewed: true,
      flag: '🇺🇸'
   },
   {
      code: 'eo',
      name: 'Esperanto',
      nativeName: 'Esperanto',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇴'
   },
   {
      code: 'et',
      name: 'Estonian',
      nativeName: 'eesti keel',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇪'
   },
   {
      code: 'ee',
      name: 'Ewe',
      nativeName: 'Eʋegbe',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇭'
   },
   {
      code: 'fo',
      name: 'Faroese',
      nativeName: 'føroyskt',
      direction: 'ltr',
      reviewed: true,
      flag: '🇫🇴'
   },
   {
      code: 'fj',
      name: 'Fijian',
      nativeName: 'vosa Vakaviti',
      direction: 'ltr',
      reviewed: true,
      flag: '🇫🇯'
   },
   {
      code: 'fi',
      name: 'Finnish',
      nativeName: 'suomi',
      direction: 'ltr',
      reviewed: true,
      flag: '🇫🇮'
   },
   {
      code: 'fr',
      name: 'French',
      nativeName: 'français',
      direction: 'ltr',
      reviewed: true,
      flag: '🇫🇷'
   },
   {
      code: 'ff',
      name: 'Fula; Fulah; Pulaar; Pular',
      nativeName: 'Fulfulde',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇳'
   },
   {
      code: 'gl',
      name: 'Galician',
      nativeName: 'Galego',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇸'
   },
   {
      code: 'ka',
      name: 'Georgian',
      nativeName: 'ქართული',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇪'
   },
   {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      direction: 'ltr',
      reviewed: true,
      flag: '🇩🇪'
   },
   {
      code: 'el',
      name: 'Greek, Modern',
      nativeName: 'Ελληνικά',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇷'
   },
   {
      code: 'gn',
      name: 'Guaraní',
      nativeName: 'Avañeẽ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇵🇾'
   },
   {
      code: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'ht',
      name: 'Haitian',
      nativeName: 'Kreyòl ayisyen',
      direction: 'ltr',
      reviewed: true,
      flag: '🇭🇹'
   },
   {
      code: 'ha',
      name: 'Hausa',
      nativeName: 'Hausa',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇬'
   },
   {
      code: 'he',
      name: 'Hebrew',
      nativeName: 'עברית',
      direction: 'rtl',
      reviewed: true,
      flag: '🇮🇱'
   },
   {
      code: 'hz',
      name: 'Herero',
      nativeName: 'Otjiherero',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇦'
   },
   {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'ho',
      name: 'Hiri Motu',
      nativeName: 'Hiri Motu',
      direction: 'ltr',
      reviewed: true,
      flag: '🇵🇬'
   },
   {
      code: 'hu',
      name: 'Hungarian',
      nativeName: 'Magyar',
      direction: 'ltr',
      reviewed: true,
      flag: '🇭🇺'
   },
   {
      code: 'ia',
      name: 'Interlingua',
      nativeName: 'Interlingua',
      direction: 'ltr',
      reviewed: true,
      flag: '🏳️'
   },
   {
      code: 'id',
      name: 'Indonesian',
      nativeName: 'Bahasa Indonesia',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇩'
   },
   {
      code: 'ie',
      name: 'Interlingue',
      nativeName: 'Interlingue',
      direction: 'ltr',
      reviewed: true,
      flag: '🏳️'
   },
   {
      code: 'ga',
      name: 'Irish',
      nativeName: 'Gaeilge',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇪'
   },
   {
      code: 'ig',
      name: 'Igbo',
      nativeName: 'Asụsụ Igbo',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇬'
   },
   {
      code: 'ik',
      name: 'Inupiaq',
      nativeName: 'Iñupiaq',
      direction: 'ltr',
      reviewed: true,
      flag: '🇺🇸'
   },
   {
      code: 'io',
      name: 'Ido',
      nativeName: 'Ido',
      direction: 'ltr',
      reviewed: true,
      flag: '🏳️'
   },
   {
      code: 'is',
      name: 'Icelandic',
      nativeName: 'Íslenska',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇸'
   },
   {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇹'
   },
   {
      code: 'iu',
      name: 'Inuktitut',
      nativeName: 'ᐃᓄᒃᑎᑐᑦ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇦'
   },
   {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      direction: 'ltr',
      reviewed: true,
      flag: '🇯🇵'
   },
   {
      code: 'jv',
      name: 'Javanese',
      nativeName: 'basa Jawa',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇩'
   },
   {
      code: 'kl',
      name: 'Greenlandic',
      nativeName: 'kalaallisut',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇱'
   },
   {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'kr',
      name: 'Kanuri',
      nativeName: 'Kanuri',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇬'
   },
   {
      code: 'ks',
      name: 'Kashmiri',
      nativeName: 'कश्मीरी',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'kk',
      name: 'Kazakh',
      nativeName: 'Қазақ тілі',
      direction: 'ltr',
      reviewed: true,
      flag: '🇰🇿'
   },
   {
      code: 'km',
      name: 'Khmer',
      nativeName: 'ភាសាខ្មែរ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇰🇭'
   },
   {
      code: 'ki',
      name: 'Kikuyu',
      nativeName: 'Gĩkũyũ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇰🇪'
   },
   {
      code: 'rw',
      name: 'Kinyarwanda',
      nativeName: 'Ikinyarwanda',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇼'
   },
   {
      code: 'ky',
      name: 'Kyrgyz',
      nativeName: 'кыргыз тили',
      direction: 'ltr',
      reviewed: true,
      flag: '🇰🇬'
   },
   {
      code: 'kv',
      name: 'Komi',
      nativeName: 'коми кыв',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇺'
   },
   {
      code: 'kg',
      name: 'Kongo',
      nativeName: 'KiKongo',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇬'
   },
   {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      direction: 'ltr',
      reviewed: true,
      flag: '🇰🇷'
   },
   {
      code: 'ku',
      name: 'Kurdish',
      nativeName: 'Kurdî',
      direction: 'rtl',
      reviewed: true,
      flag: '🇮🇶'
   },
   {
      code: 'kj',
      name: 'Kuanyama',
      nativeName: 'Kuanyama',
      direction: 'ltr',
      reviewed: true,
      flag: '🇦🇴'
   },
   {
      code: 'la',
      name: 'Latin',
      nativeName: 'latine',
      direction: 'ltr',
      reviewed: true,
      flag: '🇻🇦'
   },
   {
      code: 'lb',
      name: 'Luxembourgish',
      nativeName: 'Lëtzebuergesch',
      direction: 'ltr',
      reviewed: true,
      flag: '🇱🇺'
   },
   {
      code: 'lg',
      name: 'Luganda',
      nativeName: 'Luganda',
      direction: 'ltr',
      reviewed: true,
      flag: '🇺🇬'
   },
   {
      code: 'li',
      name: 'Limburgish',
      nativeName: 'Limburgs',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇱'
   },
   {
      code: 'ln',
      name: 'Lingala',
      nativeName: 'Lingála',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇩'
   },
   {
      code: 'lo',
      name: 'Lao',
      nativeName: 'ພາສາລາວ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇱🇦'
   },
   {
      code: 'lt',
      name: 'Lithuanian',
      nativeName: 'lietuvių kalba',
      direction: 'ltr',
      reviewed: true,
      flag: '🇱🇹'
   },
   {
      code: 'lu',
      name: 'Luba-Katanga',
      nativeName: 'Luba-Katanga',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇩'
   },
   {
      code: 'lv',
      name: 'Latvian',
      nativeName: 'latviešu valoda',
      direction: 'ltr',
      reviewed: true,
      flag: '🇱🇻'
   },
   {
      code: 'gv',
      name: 'Manx',
      nativeName: 'Gaelg',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇲'
   },
   {
      code: 'mk',
      name: 'Macedonian',
      nativeName: 'македонски јазик',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇰'
   },
   {
      code: 'mg',
      name: 'Malagasy',
      nativeName: 'Malagasy fiteny',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇬'
   },
   {
      code: 'ms',
      name: 'Malay',
      nativeName: 'bahasa Melayu',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇾'
   },
   {
      code: 'ml',
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'mt',
      name: 'Maltese',
      nativeName: 'Malti',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇹'
   },
   {
      code: 'mi',
      name: 'Māori',
      nativeName: 'te reo Māori',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇿'
   },
   {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'mh',
      name: 'Marshallese',
      nativeName: 'Kajin M̧ajeļ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇭'
   },
   {
      code: 'mn',
      name: 'Mongolian',
      nativeName: 'монгол',
      direction: 'ltr',
      reviewed: true,
      flag: '🇲🇳'
   },
   {
      code: 'na',
      name: 'Nauru',
      nativeName: 'Ekakairũ Naoero',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇷'
   },
   {
      code: 'nv',
      name: 'Navajo',
      nativeName: 'Diné bizaad',
      direction: 'ltr',
      reviewed: true,
      flag: '🇺🇸'
   },
   {
      code: 'nb',
      name: 'Norwegian Bokmål',
      nativeName: 'Norsk bokmål',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇴'
   },
   {
      code: 'nd',
      name: 'North Ndebele',
      nativeName: 'isiNdebele',
      direction: 'ltr',
      reviewed: true,
      flag: '🇿🇼'
   },
   {
      code: 'ne',
      name: 'Nepali',
      nativeName: 'नेपाली',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇵'
   },
   {
      code: 'ng',
      name: 'Ndonga',
      nativeName: 'Owambo',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇦'
   },
   {
      code: 'nn',
      name: 'Norwegian Nynorsk',
      nativeName: 'Norsk nynorsk',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇴'
   },
   {
      code: 'no',
      name: 'Norwegian',
      nativeName: 'Norsk',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇴'
   },
   {
      code: 'ii',
      name: 'Nuosu',
      nativeName: 'ꆈꌠ꒿ Nuosuhxop',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇳'
   },
   {
      code: 'nr',
      name: 'South Ndebele',
      nativeName: 'isiNdebele',
      direction: 'ltr',
      reviewed: true,
      flag: '🇿🇦'
   },
   {
      code: 'oc',
      name: 'Occitan',
      nativeName: 'Occitan',
      direction: 'ltr',
      reviewed: true,
      flag: '🇫🇷'
   },
   {
      code: 'oj',
      name: 'Ojibwe',
      nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇦'
   },
   {
      code: 'cu',
      name: 'Church Slavic',
      nativeName: 'ѩзыкъ словѣньскъ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇻🇦'
   },
   {
      code: 'om',
      name: 'Oromo',
      nativeName: 'Afaan Oromoo',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇹'
   },
   {
      code: 'or',
      name: 'Oriya',
      nativeName: 'ଓଡ଼ିଆ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'os',
      name: 'Ossetian',
      nativeName: 'ирон æвзаг',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇺'
   },
   {
      code: 'pa',
      name: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'pi',
      name: 'Pāli',
      nativeName: 'पाऴि',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'fa',
      name: 'Persian',
      nativeName: 'فارسی',
      direction: 'rtl',
      reviewed: true,
      flag: '🇮🇷'
   },
   {
      code: 'pl',
      name: 'Polish',
      nativeName: 'polski',
      direction: 'ltr',
      reviewed: true,
      flag: '🇵🇱'
   },
   {
      code: 'ps',
      name: 'Pashto',
      nativeName: 'پښتو',
      direction: 'rtl',
      reviewed: true,
      flag: '🇦🇫'
   },
   {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      direction: 'ltr',
      reviewed: true,
      flag: '🇵🇹'
   },
   {
      code: 'qu',
      name: 'Quechua',
      nativeName: 'Runa Simi',
      direction: 'ltr',
      reviewed: true,
      flag: '🇵🇪'
   },
   {
      code: 'rm',
      name: 'Romansh',
      nativeName: 'rumantsch grischun',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇭'
   },
   {
      code: 'rn',
      name: 'Kirundi',
      nativeName: 'kiRundi',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇮'
   },
   {
      code: 'ro',
      name: 'Romanian',
      nativeName: 'română',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇴'
   },
   {
      code: 'ru',
      name: 'Russian',
      nativeName: 'русский язык',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇺'
   },
   {
      code: 'sa',
      name: 'Sanskrit',
      nativeName: 'संस्कृतम्',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇦'
   },
   {
      code: 'sc',
      name: 'Sardinian',
      nativeName: 'sardu',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇹'
   },
   {
      code: 'sd',
      name: 'Sindhi',
      nativeName: 'सिन्धी',
      direction: 'rtl',
      reviewed: true,
      flag: '🇵🇰'
   },
   {
      code: 'se',
      name: 'Northern Sami',
      nativeName: 'Davvisámegiella',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇴'
   },
   {
      code: 'sm',
      name: 'Samoan',
      nativeName: 'gagana faa Samoa',
      direction: 'ltr',
      reviewed: true,
      flag: '🇼🇸'
   },
   {
      code: 'sg',
      name: 'Sango',
      nativeName: 'yângâ tî sängö',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇫'
   },
   {
      code: 'sr',
      name: 'Serbian',
      nativeName: 'српски језик',
      direction: 'ltr',
      reviewed: true,
      flag: '🇷🇸'
   },
   {
      code: 'gd',
      name: 'Scottish Gaelic',
      nativeName: 'Gàidhlig',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇧'
   },
   {
      code: 'sn',
      name: 'Shona',
      nativeName: 'chiShona',
      direction: 'ltr',
      reviewed: true,
      flag: '🇿🇼'
   },
   {
      code: 'si',
      name: 'Sinhala',
      nativeName: 'සිංහල',
      direction: 'ltr',
      reviewed: true,
      flag: '🇱🇰'
   },
   {
      code: 'sk',
      name: 'Slovak',
      nativeName: 'slovenčina',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇰'
   },
   {
      code: 'sl',
      name: 'Slovene',
      nativeName: 'slovenščina',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇮'
   },
   {
      code: 'so',
      name: 'Somali',
      nativeName: 'af Soomaali',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇴'
   },
   {
      code: 'st',
      name: 'Southern Sotho',
      nativeName: 'Sesotho',
      direction: 'ltr',
      reviewed: true,
      flag: '🇿🇦'
   },
   {
      code: 'es',
      name: 'Spanish',
      nativeName: 'español',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇸'
   },
   {
      code: 'su',
      name: 'Sundanese',
      nativeName: 'Basa Sunda',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇩'
   },
   {
      code: 'sw',
      name: 'Swahili',
      nativeName: 'Kiswahili',
      direction: 'ltr',
      reviewed: true,
      flag: '🇰🇪'
   },
   {
      code: 'ss',
      name: 'Swati',
      nativeName: 'SiSwati',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇿'
   },
   {
      code: 'sv',
      name: 'Swedish',
      nativeName: 'svenska',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇪'
   },
   {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      direction: 'ltr',
      reviewed: true,
      flag: '🇮🇳'
   },
   {
      code: 'tg',
      name: 'Tajik',
      nativeName: 'тоҷикӣ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇹🇯'
   },
   {
      code: 'th',
      name: 'Thai',
      nativeName: 'ไทย',
      direction: 'ltr',
      reviewed: true,
      flag: '🇹🇭'
   },
   {
      code: 'ti',
      name: 'Tigrinya',
      nativeName: 'ትግርኛ',
      direction: 'ltr',
      reviewed: true,
      flag: '🇪🇷'
   },
   {
      code: 'bo',
      name: 'Tibetan',
      nativeName: 'བོད་ཡིག',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇳'
   },
   {
      code: 'tk',
      name: 'Turkmen',
      nativeName: 'Türkmen',
      direction: 'ltr',
      reviewed: true,
      flag: '🇹🇲'
   },
   {
      code: 'tl',
      name: 'Tagalog',
      nativeName: 'Wikang Tagalog',
      direction: 'ltr',
      reviewed: true,
      flag: '🇵🇭'
   },
   {
      code: 'tn',
      name: 'Tswana',
      nativeName: 'Setswana',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇼'
   },
   {
      code: 'to',
      name: 'Tonga',
      nativeName: 'faka Tonga',
      direction: 'ltr',
      reviewed: true,
      flag: '🇹🇴'
   },
   {
      code: 'tr',
      name: 'Turkish',
      nativeName: 'Türkçe',
      direction: 'ltr',
      reviewed: true,
      flag: '🇹🇷'
   },
   {
      code: 'ts',
      name: 'Tsonga',
      nativeName: 'Xitsonga',
      direction: 'ltr',
      reviewed: true,
      flag: '🇹🇸'
   },
   {
      code: 'tt',
      name: 'Tatar',
      nativeName: 'татарча',
      direction: 'ltr',
      reviewed: true,
      flag: '🇹🇹'
   },
   {
      code: 'tw',
      name: 'Twi',
      nativeName: 'Twi',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇭'
   },
   {
      code: 'ty',
      name: 'Tahitian',
      nativeName: 'Reo Tahiti',
      direction: 'ltr',
      reviewed: true,
      flag: '🇵🇫'
   },
   {
      code: 'ug',
      name: 'Uyghur',
      nativeName: 'ئۇيغۇرچە',
      direction: 'rtl',
      reviewed: true,
      flag: '🇨🇳'
   },
   {
      code: 'uk',
      name: 'Ukrainian',
      nativeName: 'українська',
      direction: 'ltr',
      reviewed: true,
      flag: '🇺🇦'
   },
   {
      code: 'ur',
      name: 'Urdu',
      nativeName: 'اردو',
      direction: 'rtl',
      reviewed: true,
      flag: '🇵🇰'
   },
   {
      code: 'uz',
      name: 'Uzbek',
      nativeName: "O'zbek",
      direction: 'ltr',
      reviewed: true,
      flag: '🇺🇿'
   },
   {
      code: 've',
      name: 'Venda',
      nativeName: 'Tshivenḓa',
      direction: 'ltr',
      reviewed: true,
      flag: '🇿🇦'
   },
   {
      code: 'vi',
      name: 'Vietnamese',
      nativeName: 'Tiếng Việt',
      direction: 'ltr',
      reviewed: true,
      flag: '🇻🇳'
   },
   {
      code: 'vo',
      name: 'Volapük',
      nativeName: 'Volapük',
      direction: 'ltr',
      reviewed: true,
      flag: '🏳️'
   },
   {
      code: 'wa',
      name: 'Walloon',
      nativeName: 'Walon',
      direction: 'ltr',
      reviewed: true,
      flag: '🇧🇪'
   },
   {
      code: 'cy',
      name: 'Welsh',
      nativeName: 'Cymraeg',
      direction: 'ltr',
      reviewed: true,
      flag: '🇬🇧'
   },
   {
      code: 'wo',
      name: 'Wolof',
      nativeName: 'Wollof',
      direction: 'ltr',
      reviewed: true,
      flag: '🇸🇳'
   },
   {
      code: 'fy',
      name: 'Western Frisian',
      nativeName: 'Frysk',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇱'
   },
   {
      code: 'xh',
      name: 'Xhosa',
      nativeName: 'isiXhosa',
      direction: 'ltr',
      reviewed: true,
      flag: '🇿🇦'
   },
   {
      code: 'yi',
      name: 'Yiddish',
      nativeName: 'ייִדיש',
      direction: 'rtl',
      reviewed: true,
      flag: '🇮🇱'
   },
   {
      code: 'yo',
      name: 'Yoruba',
      nativeName: 'Yorùbá',
      direction: 'ltr',
      reviewed: true,
      flag: '🇳🇬'
   },
   {
      code: 'za',
      name: 'Zhuang',
      nativeName: 'Saw cuengh',
      direction: 'ltr',
      reviewed: true,
      flag: '🇨🇳'
   },
];

export default languages;
