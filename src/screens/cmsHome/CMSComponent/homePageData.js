export const homePageData = [
  {
    component: "HomePageBanner",
    props: {
      banners: [
        {
          id: "1",
          web: "https://assets.stylori.com/banners/web/NAC-Stylori-Jewellers-CSK-banner-D.webp",
          mobile:
            "https://assets.stylori.com/banners/web/NAC-Stylori-Jewellers-CSK-banner-M.webp",
          position: "1",
          url: "",
        },
        {
          id: "2",
          web: "https://assets.stylori.com/banners/web/Stylori-gold-jewellery-Stack-collection-D.webp",
          mobile:
            "https://assets.stylori.com/banners/web/Stylori-gold-jewellery-Stack-collection-M.webp",
          position: "22",
          url: "",
        },
        {
          id: "3",
          web: "https://assets.stylori.com/banners/web/Stylori-Earrings-jewellery-21-mar-W.webp",
          mobile:
            "https://assets.stylori.com/banners/web/Stylori-Earrings-jewellery-21-mar-M.webp",
          position: "3",
          url: "",
        },
      ],
    },
  },
  {
    component: "HomePageIconsList",
    props: {
      cardContent: [
        {
          name: "From the House of NAC",
          icon: "https://assets.stylori.com/images/Static+Pages/Other+Pages/fromthehouseofnac-pink.svg",
          class: "image1",
        },
        {
          name: "Certified Jewellery",
          icon: "https://assets.stylori.com/images/Static%20Pages/Other%20Pages/certifiedjewellery-pink.svg",
          class: "image2",
        },
        {
          name: "Free Shipping",
          icon: "https://assets.stylori.com/images/Static+Pages/Other+Pages/securepayments-pink.svg",
          class: "image3",
        },
        {
          name: "Diverse Styles",
          icon: "https://assets.stylori.com/images/Static+Pages/Other+Pages/diversestyles-pink.svg",
          class: "image4",
        },
        {
          name: "Easy Returns",
          icon: "https://assets.stylori.com/images/Static+Pages/Other+Pages/easyreturns-pink.svg",
          class: "image5",
        },
      ],
    },
  },
  {
    component: "CollectionCardData",
    props: {
      collectionGrid: [
        {
          image_1:
            "https://assets.stylori.com/banners/web/Stylori-Monsoon-tile.webp",
          navigateUrl: "/jewellery-from+monsoon+collection",
        },
        {
          image_2:
            "https://assets.stylori.com/banners/web/mangocollection.webp",
          navigateUrl: "/jewellery-from+the+summer+collection?sort=latest",
        },
        {
          image_3:
            "https://assets.stylori.com/banners/web/Stylori-Butterfly-tile-image.webp",
          navigateUrl:
            "/jewellery-butterfly?sort=latest&amp;startprice=0&amp;endprice=0",
        },
        {
          image_4:
            "https://assets.stylori.com/banners/web/Stylori_-Daisy-Days.webp",
          navigateUrl:
            "/jewellery-from+daisy+days+collection?sort=latest&page=4",
        },
        {
          image_5: "https://assets.stylori.com/banners/web/blush-3.webp",
          navigateUrl: "/jewellery-blush",
        },
      ],
    },
  },
  {
    component: "CollectionJewelleryData",
    props: {
      jewelleryGrid: {
        pendantsCollection: [
          {
            image:
              "https://assets.stylori.com/images/Static+Pages/Home+Page/PendantVertical.webp",
            navigateUrl: "/pendants-jewellery?sort=latest",
          },
        ],
        banglsCollection: [
          {
            image:
              "https://assets.stylori.com/images/Static+Pages/Home+Page/BangleSquare.webp",
            navigateUrl: "/bangles-jewellery?sort=latest",
          },
        ],
        earingsCollection: [
          {
            image:
              "https://assets.stylori.com/images/Static+Pages/Home+Page/EarringRectangle.webp",
            navigateUrl: "/earrings-jewellery?sort=latest",
          },
        ],
        ringsCollection: [
          {
            image:
              "https://assets.stylori.com/images/Static+Pages/Home+Page/RingRectangle.webp",
            navigateUrl: "/rings-jewellery?sort=latest",
          },
        ],
        nosepinsCollection: [
          {
            image:
              "https://assets.stylori.com/images/Static+Pages/Home+Page/nosepinSquare.webp",
            navigateUrl: "/nose+pin+online-jewellery?sort=featured",
          },
        ],
      },
    },
  },
  {
    component: "TestimonialCard",
    props: {
      cardContent: {
        allCustomerReviews: {
          nodes: [
            {
              customerName: "",
              message:
                "Wowwww it's a great experience with stylori. Specially thanks to Bushra from customer service who help me to find a best product with detail explanation on each and every point of product.",
              productListByProductId: {
                productImagesByProductId: {
                  nodes: [
                    {
                      imagePosition: "1",
                      imageUrl:
                        "https://s3-ap-southeast-1.amazonaws.com/media.nacjewellers.com/resources/static+page+images/collection+page/Group+46%402x.png",
                      isdefault: true,
                      productColor: "Yellow",
                      productId: "SP0195",
                    },
                  ],
                },
              },
              title: "Amazing product",
              transSkuListByProductSku: {
                markupPrice: "66889.44",
                skuUrl: "jewellery/pendants/diamond/Sun-Ray-?skuid=21491",
              },
            },
            {
              customerName: "Selvan",
              message:
                "Wowwww it's a great experience with stylori. Specially thanks to Bushra from customer service who help me to find a best product with detail explanation on each and every point of product.",
              productListByProductId: {
                productImagesByProductId: {
                  nodes: [
                    {
                      imagePosition: "1",
                      imageUrl:
                        "https://s3-ap-southeast-1.amazonaws.com/media.nacjewellers.com/resources/static+page+images/collection+page/Group+46%402x.png",
                      isdefault: true,
                      productColor: "Yellow",
                      productId: "SE1616",
                    },
                  ],
                },
              },
              title: "Testing from Selva",
              transSkuListByProductSku: {
                markupPrice: "7760.14",
                skuUrl:
                  "jewellery/earrings/diamond/Cerulean-Cloud-Diamond-Earrings?skuid=180796",
              },
            },
            {
              customerName: "Selvan",
              message:
                "Wowwww it's a great experience with stylori. Specially thanks to Bushra from customer service who help me to find a best product with detail explanation on each and every point of product.",
              productListByProductId: {
                productImagesByProductId: {
                  nodes: [
                    {
                      imagePosition: "1",
                      imageUrl:
                        "https://s3-ap-southeast-1.amazonaws.com/media.nacjewellers.com/resources/static+page+images/collection+page/Group+46%402x.png",
                      isdefault: true,
                      productColor: "Yellow",
                      productId: "SGC036",
                    },
                  ],
                },
              },
              title: "Test",
              transSkuListByProductSku: {
                markupPrice: "22635.14",
                skuUrl:
                  "goldcoins/weight/4gm/4-Gm-Balaji-Gold-coin-24Kt?skuid=54088",
              },
            },
            {
              customerName: "Baskar",
              message:
                "Wowwww it's a great experience with stylori. Specially thanks to Bushra from customer service who help me to find a best product with detail explanation on each and every point of product.",
              productListByProductId: {
                productImagesByProductId: {
                  nodes: [
                    {
                      imagePosition: "1",
                      imageUrl:
                        "https://s3-ap-southeast-1.amazonaws.com/media.nacjewellers.com/resources/static+page+images/collection+page/Group+46%402x.png",
                      isdefault: true,
                      productColor: "Yellow",
                      productId: "SE1616",
                    },
                  ],
                },
              },
              title: "Test",
              transSkuListByProductSku: {
                markupPrice: "22635.14",
                skuUrl:
                  "jewellery/earrings/diamond/Cerulean-Cloud-Diamond-Earrings?skuid=180796",
              },
            },
            {
              customerName: "Selvan",
              message:
                "Wowwww it's a great experience with stylori. Specially thanks to Bushra from customer service who help me to find a best product with detail explanation on each and every point of product.",
              productListByProductId: {
                productImagesByProductId: {
                  nodes: [
                    {
                      imagePosition: "1",
                      imageUrl:
                        "https://s3-ap-southeast-1.amazonaws.com/media.nacjewellers.com/resources/static+page+images/collection+page/Group+46%402x.png",
                      isdefault: true,
                      productColor: "Yellow",
                      productId: "SE0117",
                    },
                  ],
                },
              },
              title: "Test",
              transSkuListByProductSku: {
                markupPrice: "122635.14",
                skuUrl: "jewellery/earrings/diamond/Suyra-Drops?skuid=23410",
              },
            },
          ],
        },
      },
    },
  },
  {
    component: "StoriesCard",
    props: {
      storiesData: [
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_01_bollywood_buck.png",
          title: "Celebrity Wedding Season: Style lessons from the best",
          cardHeader: "Celebrity Wedding Season: Style lessons from the best",
          cardContent:
            "It looks like summer was forgotten this year with everyone talking about the arrival of celebrity wedding season.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/Travel-stylori-blog-cover.jpg",
          title: "Travel Chic",
          cardHeader: "Travel Chic",
          cardContent:
            "With sunny skies and sandy beaches, summer is a great time to explore new locations. It can also be a great time to explore exciting fashion trends",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori-blog-cover-mar-01-2.jpg",
          title: "Oscars 2018: Best Dressed",
          cardHeader: "Oscars 2018: Best Dressed",
          cardContent:
            "At the Oscars,whether you win or lose, everyone remembers what you wore. The most prestigious film awards night is also one of the biggest fashion moments.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/BLOG-COVER-FEB-02.jpg",
          title: "Unique date ideas for Valentine’s Day",
          cardHeader: "Unique date ideas for Valentine’s Day",
          cardContent:
            "With Valentine’s Day just around the corner, the excitement to make your loved one truly feel special is on the rise.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori-blog-cover-01-2.jpg",
          title: "2018 fashion trends: A makeover for the new year",
          cardHeader: "2018 fashion trends: A makeover for the new year",
          cardContent:
            "January. It's that time of the year when you give your wardrobe a makeover.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori-blog-cover-new-8.jpg",
          title: "Quirky gifts for the holiday season",
          cardHeader: "Quirky gifts for the holiday season",
          cardContent:
            "Gift season is here. Unfortunately for most of us that means giving and receiving the same kind of gifts every year.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori-blog_cover-new-6.jpg",
          title: "Style guide: The don'ts of winter dressing",
          cardHeader: "Style guide: The don'ts of winter dressing",
          cardContent:
            "Travelling to colder places this winter? The season is called gloomy for a reason, but one can enjoy the experience if they're dressed adequately.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori-blogcover-new-5.jpg",
          title: "Smitten by Alia Bhatt: Fashion goals for 2017",
          cardHeader: "Smitten by Alia Bhatt: Fashion goals for 2017",
          cardContent:
            "Ever since she made her debut in Karan Johar's Student of the Year, we've been smitten by Alia Bhatt.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blogcover_writeyourownstry.jpg",
          title: "Write your own story",
          cardHeader: "Write your own story",
          cardContent:
            "It was on the eve of my departure when I realized that my life would never be the same again",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_unity_by_diversity.jpg",
          title:
            "United by diverse styles: India's traditional nose rings, pins and studs",
          cardHeader:
            "United by diverse styles: India's traditional nose rings, pins and studs",
          cardContent:
            "It is one of the defining features of Indian jewellery. For centuries, Indian women have pierced their noses and adorned themselves with nose rings, pins and studs.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_jewellery-through-the-ages.jpg",
          title: "Old Is Gold: History Of Indian Jewellery",
          cardHeader: "Old Is Gold: History Of Indian Jewellery",
          cardContent:
            "In your collection of jewellery with elegant, contemporary designs, it is your grandmother's ring passed down to you that takes pride of place",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_summer-style-guide-2017.jpg",
          title: "Style guide: Looking cool this summer",
          cardHeader: "Style guide: Looking cool this summer",
          cardContent:
            "In India, summer can be a long period of sunny days and windless nights.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_pop_the_question_in_style.jpg",
          title:
            "Beyond clichés: Creative ways to pop the question on Valentine's Day",
          cardHeader:
            "Beyond clichés: Creative ways to pop the question on Valentine's Day",
          cardContent:
            "Popping the question has become harder than ever before. There are couples who have asked and answered while skydiving, scuba diving and deep sea diving. There is no country left unexplored for a picturesque place to get down on one knee and propose marriage. There are no restaurants, big or small, where the waiters haven't brought a ring along with the food and clapped while the lady cries, smiles and says yes.\r\n\r\nSo, what does an enterprising young man do? Fear not. There are more budget-friendly but creative ways in which you can pop the question. Let's take a look at some tried and tested methods.\r\n\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_valentines-day-2016-men.jpg",
          title:
            "Beyond ties and socks: What to gift your man on Valentine's Day",
          cardHeader:
            "Beyond ties and socks: What to gift your man on Valentine's Day",
          cardContent:
            "Honey, if you're reading this, let me say that I still love you despite all the gifts you've given me so far. Men pretend to be above the idea of gifting but, in truth, we love receiving gifts. Facing the prospect of getting another pair of socks this year, we have realized that it is time we speak up about what we really want.\r\n\r\nSo, pull out your pens and take notes, ladies. Here are some gifting ideas for men on Valentine's Day.\r\n\r",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_bizarre_fashion_trends_of_2016.jpg",
          title: "Fashion jewellery: Avant Garde or Avant Farce?",
          cardHeader: "Fashion jewellery: Avant Garde or Avant Farce?",
          cardContent:
            "Like art, fashion is also subjective. It lies in the eye of the beholder. But what happens when fashion is so avant-garde that it seemingly belongs only on ramps and red carpets? Does anyone actually wear it in the real world?\r\n\r\nWe decided to analyze recent jewellery trends. Our findings horrified us. Were these designers playing an elaborate practical joke on everyone? Take a look for yourself and decide.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_best_of_2016.jpg",
          title: "Best of 2016 – Fashion trends by Bollywood’s leading ladies",
          cardHeader:
            "Best of 2016 – Fashion trends by Bollywood’s leading ladies",
          cardContent:
            "It has been a great year for Bollywood so far. Especially for our leading ladies.\r\n\r\nSonamKapoor showed us the face of heroism in Neerja. KareenaKapoor Khan played the role of a primary breadwinner in Ki &Ka while her husband took care of the household. Ritika Singh dominated the boxing ring in SaalaKhadoos and the brave women of Pink stood up to their abusers.Priyanka Chopra has broken into Hollywood with her upcoming Baywatch remake and DeepikaPadukone joins Vin Diesel in XXX: Return of Xander Cage.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_karwa_chauth.jpg",
          title: "KarvaChauth: Eat, Pray, Love",
          cardHeader: "KarvaChauth: Eat, Pray, Love",
          cardContent:
            "Once upon a time, KarvaChauth was a celebration in which women prayed for their husbands’ safe returnfrom war.While today, the modern womanmay find the concept a tad bit dated, there’s no denying the romance of gazing at the moon with your beloved.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_best_tips_for_monsoon.jpg",
          title: "Monsoon style guide: Essential tips and tricks",
          cardHeader: "Monsoon style guide: Essential tips and tricks",
          cardContent:
            "As children, the monsoon was our favourite time of the year. As adults, we have a more complicated relationship with the season. The primary reason for this love-hate relationship is the monsoon makeup malfunction. Even the lightest drizzle can be disastrous if your makeup isn't waterproof.\r\n\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_wedding_bands.jpg",
          title: "Wedding Rings: Made for each other",
          cardHeader: "Wedding Rings: Made for each other",
          cardContent:
            "Indian weddings are traditional as much as they are contemporary, a balance between the ancient and modern. A significant part of the wedding is the exchange of rings, inspired by traditions of the West.\r\nWhile many weddings still go with the traditional mangalsutra, there are weddings that have both the mangalsutra and the wedding ring.\r\nLet's take a look at the significance of wedding rings.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_monsoon_rainy_season_style_tips_guide.jpg",
          title: "Monsoon ensembles: Brightening up gloomy days",
          cardHeader: "Monsoon ensembles: Brightening up gloomy days",
          navurl:
            "The monsoon can be a bittersweet experience. On one hand, it brings respite from the blazing heat of the Indian summer. On the other hand, it is gloomy weather where the skies are of a dull, grey colour. Taking inspiration from the rainbow which adds colour to the skies after a spell of rain, we can add colour to the monsoon in our own little ways.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_winter_style_2016.jpg",
          title: "Winter Style: Heat up the holiday season",
          cardHeader: "Winter Style: Heat up the holiday season",
          cardContent:
            "As winter approaches and the holiday season draws nearer, the parties are only going to get bigger and better. Don't let the cold weather stop you from enjoying the holiday season in style.\r\n\r\nIt's time to get winter ready.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_the_heirloom.jpg",
          title: "The Heirloom",
          cardHeader: "The Heirloom",
          cardContent:
            "My grandfather was on his deathbed. He had lived a long and eventful life.\nDid he have any regrets, I wondered, as I walked in to see him. His last wish had been to see me before he departed on his final journey.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_modern_earcuffs_the_latest_style_statementjpg.jpg",
          title: "The timeless appeal of the Ear Cuff",
          cardHeader: "The timeless appeal of the Ear Cuff",
          cardContent:
            "Fashion can, at times, be timeless. Many fashion trends are simply a rebirth of older trends, gaining popularity decades or even centuries after they die out. In the case of the ear cuffs, the story begins in 2000 B.C.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_cannes-film-festival-2016.jpg",
          title: "Cannes Style - Decoded / Can Do Cannes Style",
          cardHeader: "Cannes Style - Decoded / Can Do Cannes Style",
          cardContent:
            "The Cannes Film festival provides some of the most inspirational work, on film, and on fabric.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_the_perfect_gift_to_a_daughter.jpg",
          title: "The Perfect Gift",
          cardHeader: "The Perfect Gift",
          cardContent:
            "I always thought my father was a mind reader.\nHe would buy me the perfect gift every time. It was always exactly what I wanted.\r\n\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_background_of_moonstone_bloodstone_amethyst.jpg",
          title: "Unusual stones with unusual stories",
          cardHeader: "Unusual stones with unusual stories",
          cardContent:
            "The moonstone, bloodstone and the amethyst may not be precious stones, but they certainly have a mystical background which rivals their more famous cousins like the emerald and sapphire.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_what_are_brothers_good_for.jpg",
          title: "What are brothers good for?",
          cardHeader: "What are brothers good for?",
          cardContent:
            "We've always had a complex relationship with our brothers. He's the one person who has annoyed us throughout our childhood, but he's also our favourite-est person in the world. For those of you who grew up without brothers, here's what you've been missing out on.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_memory_of_ma.jpg",
          title: "A Memory of Ma",
          cardHeader: "A Memory of Ma",
          cardContent:
            "It's funny how nobody ever tells you this, it's almost like they're keeping it a secret. Every bride or newlywed you meet will regale you with stories of shops entered, family visits made, and dinners dined on. But nobody ever mentions this. A feeling so strong it takes over you completely...it's not the wedding itself, it's not even the moment when you look up into your husband's eye and realize \"this is it...this is us, together forever.\"",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_mumsandpearls.jpg",
          title: "The Thing About Mums and Pearls",
          cardHeader: "The Thing About Mums and Pearls",
          cardContent:
            "Pearls always remind me of mum. Not just because she's an army wife - always in crisp, well draped evening wear saris, paired with her signature string of pearls and a touch of silver hair that add to her regal flair - but because of the simplicity and natural elegance of pearls. Just like mum.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_mothersday.jpg",
          title: "Ma-rvellous within a Budget",
          cardHeader: "Ma-rvellous within a Budget",
          cardContent:
            "Let’s save the clichés for the cards. And let’s be honest about why we really love our mums. They are givers. They give love, they give care, they give you toys (and phones) even if it means not buying themselves that saree they’ve been eyeing.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_jewellery_styles.jpg",
          title: "Jewellery Styles that work for Office",
          cardHeader: "Jewellery Styles that work for Office",
          cardContent:
            "( because not all do! )\r\nJewellery is an intimate part of our lives, often worn as a reflection of our personality. Stylish pieces of jewellery can personalize and jazz up even the most ordinary ensemble but when it comes to the office, not all jewellery works. Now, there is no need to despair – this doesn’t mean that you have to look staid and boring in office; it just means that you should pick and choose correctly.\r\n\r\nStylori brings you some tricks and tips to ensure you have a hassle free ‘dressing for office’ experience:\r\n\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_2016_emmy_awards.jpg",
          title: "Style Guide: Raddest looks at Emmys 2016",
          cardHeader: "Style Guide: Raddest looks at Emmys 2016",
          cardContent:
            "It is an awards night that rivals the prestige of the Oscars every year. While we were waiting to see if Game of Thrones would sweep all the awards, the red carpet at the Emmys was where all the cameras were at. For good reason.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_yashoda_krishna_story.jpg",
          title: "Yashoda's Story",
          cardHeader: "Yashoda's Story",
          cardContent:
            "On Janmashtami, we celebrate the birth and life of Krishna, following his journey from the child who loved stealing butter and defeating demons to the handsome young man whose irresistible charm stole many a gopika's heart and finally the charioteer who counselled Arjuna during the Great War of the Mahabharata. His story is filled with interesting people: His brother Balarama, the Pandavas and the Kauravas. What about the woman who raised him? What was Yashoda's story?",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_lakme_fashion_week.jpg",
          title:
            "Style Guide: Bollywood’s hottest looks at Lakmé Fashion Week 2016",
          cardHeader:
            "Style Guide: Bollywood’s hottest looks at Lakmé Fashion Week 2016",
          cardContent:
            "Every year during the Lakmé Fashion Week, the spotlight is on the hottest stars from Bollywood who take centre stage as showstoppers. It was no different this year either at the Lakmé Fashion Week Winter/Festive '16.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_ganesha_the_most_popular_god_among_hindus.jpg",
          title: "Everybody’s Ganesha",
          cardHeader: "Everybody’s Ganesha",
          cardContent:
            'He is one of the most popular Gods among the Hindus. Ganesha has a playful spirit associated with him and, at the same time, he is also revered as the God of Wisdom. Most importantly, he is accessible to everyone. It was the renowned freedom fighter Lokmanya Tilak who once said that Ganesha was "the God for everybody".',
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_what_are_brothers_good_for.jpg",
          title: "What are brothers good for?",
          cardHeader: "What are brothers good for?",
          cardContent:
            "We've always had a complex relationship with our brothers. He's the one person who has annoyed us throughout our childhood, but he's also our favourite-est person in the world. For those of you who grew up without brothers, here's what you've been missing out on.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_background_of_moonstone_bloodstone_amethyst.jpg",
          title: "Unusual stones with unusual stories",
          cardHeader: "Unusual stones with unusual stories",
          cardContent:
            "The moonstone, bloodstone and the amethyst may not be precious stones, but they certainly have a mystical background which rivals their more famous cousins like the emerald and sapphire.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_the_perfect_gift_to_a_daughter.jpg",
          title: "The Perfect Gift",
          cardHeader: "The Perfect Gift",
          cardContent:
            "I always thought my father was a mind reader.\nHe would buy me the perfect gift every time. It was always exactly what I wanted.\r\n\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_cannes-film-festival-2016.jpg",
          title: "Cannes Style - Decoded / Can Do Cannes Style",
          cardHeader: "Cannes Style - Decoded / Can Do Cannes Style",
          cardContent:
            "The Cannes Film festival provides some of the most inspirational work, on film, and on fabric.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_modern_earcuffs_the_latest_style_statementjpg.jpg",
          title: "The timeless appeal of the Ear Cuff",
          cardHeader: "The timeless appeal of the Ear Cuff",
          cardContent:
            "Fashion can, at times, be timeless. Many fashion trends are simply a rebirth of older trends, gaining popularity decades or even centuries after they die out. In the case of the ear cuffs, the story begins in 2000 B.C.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_the_heirloom.jpg",
          title: "The Heirloom",
          cardHeader: "The Heirloom",
          cardContent:
            "My grandfather was on his deathbed. He had lived a long and eventful life.\nDid he have any regrets, I wondered, as I walked in to see him. His last wish had been to see me before he departed on his final journey.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_winter_style_2016.jpg",
          title: "Winter Style: Heat up the holiday season",
          cardHeader: "Winter Style: Heat up the holiday season",
          cardContent:
            "As winter approaches and the holiday season draws nearer, the parties are only going to get bigger and better. Don't let the cold weather stop you from enjoying the holiday season in style.\r\n\r\nIt's time to get winter ready.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_monsoon_rainy_season_style_tips_guide.jpg",
          title: "Monsoon ensembles: Brightening up gloomy days",
          cardHeader: "Monsoon ensembles: Brightening up gloomy days",
          navurl:
            "The monsoon can be a bittersweet experience. On one hand, it brings respite from the blazing heat of the Indian summer. On the other hand, it is gloomy weather where the skies are of a dull, grey colour. Taking inspiration from the rainbow which adds colour to the skies after a spell of rain, we can add colour to the monsoon in our own little ways.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_wedding_bands.jpg",
          title: "Wedding Rings: Made for each other",
          cardHeader: "Wedding Rings: Made for each other",
          cardContent:
            "Indian weddings are traditional as much as they are contemporary, a balance between the ancient and modern. A significant part of the wedding is the exchange of rings, inspired by traditions of the West.\r\nWhile many weddings still go with the traditional mangalsutra, there are weddings that have both the mangalsutra and the wedding ring.\r\nLet's take a look at the significance of wedding rings.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_best_tips_for_monsoon.jpg",
          title: "Monsoon style guide: Essential tips and tricks",
          cardHeader: "Monsoon style guide: Essential tips and tricks",
          cardContent:
            "As children, the monsoon was our favourite time of the year. As adults, we have a more complicated relationship with the season. The primary reason for this love-hate relationship is the monsoon makeup malfunction. Even the lightest drizzle can be disastrous if your makeup isn't waterproof.\r\n\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_karwa_chauth.jpg",
          title: "KarvaChauth: Eat, Pray, Love",
          cardHeader: "KarvaChauth: Eat, Pray, Love",
          cardContent:
            "Once upon a time, KarvaChauth was a celebration in which women prayed for their husbands’ safe returnfrom war.While today, the modern womanmay find the concept a tad bit dated, there’s no denying the romance of gazing at the moon with your beloved.",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_best_of_2016.jpg",
          title: "Best of 2016 – Fashion trends by Bollywood’s leading ladies",
          cardHeader:
            "Best of 2016 – Fashion trends by Bollywood’s leading ladies",
          cardContent:
            "It has been a great year for Bollywood so far. Especially for our leading ladies.\r\n\r\nSonamKapoor showed us the face of heroism in Neerja. KareenaKapoor Khan played the role of a primary breadwinner in Ki &Ka while her husband took care of the household. Ritika Singh dominated the boxing ring in SaalaKhadoos and the brave women of Pink stood up to their abusers.Priyanka Chopra has broken into Hollywood with her upcoming Baywatch remake and DeepikaPadukone joins Vin Diesel in XXX: Return of Xander Cage.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_bizarre_fashion_trends_of_2016.jpg",
          title: "Fashion jewellery: Avant Garde or Avant Farce?",
          cardHeader: "Fashion jewellery: Avant Garde or Avant Farce?",
          cardContent:
            "Like art, fashion is also subjective. It lies in the eye of the beholder. But what happens when fashion is so avant-garde that it seemingly belongs only on ramps and red carpets? Does anyone actually wear it in the real world?\r\n\r\nWe decided to analyze recent jewellery trends. Our findings horrified us. Were these designers playing an elaborate practical joke on everyone? Take a look for yourself and decide.\r\n",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_valentines-day-2016-men.jpg",
          title:
            "Beyond ties and socks: What to gift your man on Valentine's Day",
          cardHeader:
            "Beyond ties and socks: What to gift your man on Valentine's Day",
          cardContent:
            "Honey, if you're reading this, let me say that I still love you despite all the gifts you've given me so far. Men pretend to be above the idea of gifting but, in truth, we love receiving gifts. Facing the prospect of getting another pair of socks this year, we have realized that it is time we speak up about what we really want.\r\n\r\nSo, pull out your pens and take notes, ladies. Here are some gifting ideas for men on Valentine's Day.\r\n\r",
        },
        {
          image:
            "https://assets.stylori.com/images/stories/stylori_blog_cover_pop_the_question_in_style.jpg",
          title:
            "Beyond clichés: Creative ways to pop the question on Valentine's Day",
          cardHeader:
            "Beyond clichés: Creative ways to pop the question on Valentine's Day",
          cardContent:
            "Popping the question has become harder than ever before. There are couples who have asked and answered while skydiving, scuba diving and deep sea diving. There is no country left unexplored for a picturesque place to get down on one knee and propose marriage. There are no restaurants, big or small, where the waiters haven't brought a ring along with the food and clapped while the lady cries, smiles and says yes.\r\n\r\nSo, what does an enterprising young man do? Fear not. There are more budget-friendly but creative ways in which you can pop the question. Let's take a look at some tried and tested methods.\r\n\r\n",
        },
      ],
    },
  },
];
