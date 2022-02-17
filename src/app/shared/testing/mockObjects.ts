import { Hotel, Price } from 'app/shared/models'

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 1,
    name: 'Shinagawa Prince Hotel',
    rating: 7.7,
    stars: 4,
    address: '108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg',
    description: '<p>Boasting 15 food and beverage options, 2 swimming pools, and its own aquarium, Prince Hotel is right next to JR Shinagawa Train Station, from where Haneda Airport is only a 25-minute train ride away. This 39-storey hotel offers beautiful Tokyo views and free WiFi throughout the entire hotel.</p> <br> <p>The air-conditioned rooms at Shinagawa Prince Hotel have a fridge and an en suite bathroom with a bathtub and shower booth. Free toiletries and a hairdryer are provided. Guests will also find a personal locker in the room.</p> <br> <p>By train, Shibuya is 5 stops away and Shinjuku is a 16-minute ride. Tokyo Station is an 11-minute train ride away. Direct buses to and from Narita Airport stop at the hotel.</p> <br> <p>A city within a city, the hotel has its own movie theatre, bowling alley and tennis courts. Guests can enjoy a visit to the karaoke bar. The hotel also features a 24-hour front desk, indoor and outdoor pools, a sauna facility and massage services. Currency exchange service is available. Guests will find drink vending machines and a cash machine on site.</p> <br> <p>The 39th-floor Dining & Bar Table 9 Tokyo offers one of Tokyo’s best views. Restaurants serves unique Western cuisine, grill and steaks, while the bar lounge offers fusion tapas and drinks including whiskey, cocktails, sake and champagne. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p>'
  },
  {
    id: 2,
    name: 'The Ritz-Carlton, Tokyo',
    rating: 9.1,
    stars: 5,
    address: '107-6245 Tokyo Prefecture, Minato-ku, Akasaka 9-7-1 Tokyo Midtown, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/NXnQ/i12_m.jpg',
    description: '<p>Located at the heart of the downtown Roppongi area in Tokyo\'s tallest building, the 53rd-storey Ritz-Carlton offers elegant luxury high above Tokyo’s busy streets. It features an indoor pool and 8 dining options. Free WiFi is available throughout the hotel.</p> <br> <p>Rooms at the Tokyo Ritz-Carlton offer breathtaking views of the Shinjuku area, the Imperial Palace or Mount Fuji. All rooms come with a DVD player and a spacious marble bathroom. You will find a flat-screen TV with satellite channels, minibar and coffee machine.</p> <br> <p>Guests can pamper themselves with a treatment at the spa, or unwind in a whirlpool with city skyline views. Other facilities include saunas, a gym and bicycle rental.</p> <br> <p>Restaurants at the Ritz-Carlton vary from French to Japanese cuisine, all offering spectacular views. The Michelin star rated restaurant Azure 45 serves French delicacies, while guests can enjoy live musical performance in the afternoon and evening at The Bar.</p> <br> <p>The Ritz-Carlton Tokyo is directly connected to Roppongi Station, which offers easy subway access to Shinjuku and Akihabara. The National Art Centre and Roppongi Hills are about a 10-minute walk. Tokyo Station and the Imperial Palace are both a 20-minute taxi ride away. </p> <br> <p>Minato is a great choice for travellers interested in clean streets, friendly locals and culture.</p> <br> <p>This property also has one of the best-rated locations in Tokyo! Guests are happier about it compared to other properties in the area.</p>'
  },
  {
    id: 3,
    name: 'Park Hyatt Tokyo',
    rating: 9.2,
    stars: 5,
    address: '163-1055 Tokyo Prefecture, Shinjuku-ku, Nishishinjuku 3-7-1-2, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/VuLE/i1_m.jpg',
    description: '<p>High above Shinjuku’s lively streets, the wide windows of Park Hyatt Tokyo’s spacious rooms offer beautiful views of Mount Fuji or Shinjuku. An indoor pool and 52nd-floor restaurant are featured.</p> <br> <p>Rooms at the Tokyo Park Hyatt boast Hokkaido wood panelling and Egyptian cotton sheets. Guests can pour a drink at the wet bar and relax in the deep bathtub, or stretch out in the fluffy bathrobe and watch a video-on-demand movie. Free toiletries, slippers and a hairdryer are provided. Rooms also feature a seating area, desk and free high-speed wired internet as well as WiFi access.</p> <br> <p>Shinjuku Central Park is a 3-minute walk from the hotel. JR Shinjuku Train Station is a 15-minute walk away, and Shinjuku Gyoen is a 20-minute walk.</p> <br> <p>Guests can enjoy the massage or sauna at Club on the Park Spa or work out at the fitness room, which boasts floor-to-ceiling windows. The hotel’s library offers a wide selection and the front desk is open 24-hours a day. Currency exchange service is available at the hotel.</p> <br> <p>The 52nd-floor New York Grill offers spectacular skyline views. Guests can enjoy a drink at The Peak Bar while watching the sun set in the Tokyo Skyline. Sumptuous cakes and seasonal sweets can be purchased at the Pastry Boutique, while modern Japanese dishes, French cuisine and a stylish cafe are also available on site. </p> <br> <p>Shinjuku Ward is a great choice for travellers interested in shopping, friendly locals and food.</p> <br> <p>This property also has one of the best-rated locations in Tokyo! Guests are happier about it compared to other properties in the area.</p> <br> <p>Couples particularly like the location — they rated it 9.0 for a two-person trip.</p>'
  },
  {
    id: 4,
    name: 'Hotel Odakyu Hotel Century Southern Tower',
    rating: 8.9,
    stars: 3,
    address: '151-8583 Tokyo Prefecture, Shibuya-ku, Yoyogi 2-2-1, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/hYjB/i1_m.jpg',
    description: '<p>Offering a restaurant and a fitness centre, Odakyu Hotel Century Southern Tower is located in Tokyo. Free WiFi access is available.</p> <br> <p>Each room here will provide you with air conditioning. There is also an electric kettle. Featuring a bath, private bathroom also comes with a hairdryer and free toiletries. Extras include a desk, a safety deposit box and bed linen.</p> <br> <p>At Odakyu Hotel Century Southern Tower you will find a 24-hour front desk and a bar. Other facilities offered at the hotel include luggage storage and a vending machine.</p> <br> <p>The hotel is 900 m from Shinjuku Gyoen National Garden, 1.3 km from Meiji Jingu Shrine and 1.8 km from Harajuku Station. Tokyo Haneda International Airport is 16 km away. </p> <br> <p>Shibuya Ward is a great choice for travellers interested in shopping, food and friendly locals.</p> <br> <p>This property also has one of the best-rated locations in Tokyo! Guests are happier about it compared to other properties in the area.</p> <br> <p>Couples particularly like the location — they rated it 9.5 for a two-person trip.</p>'
  },
  {
    id: 5,
    name: 'Hotel Book And Bed Tokyo Shinjuku',
    rating: 8.4,
    stars: 2,
    address: '160-0021 Tokyo Prefecture, Shinjuku Kabukicho 1-27-5 Kabukicho APM Building 8F, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/ahU1/i8_m.jpg',
    description: '<p>Set in Tokyo, 1.9 km from Tokyo Metropolitan Government Building, Book And Bed Tokyo Shinjuku features air-conditioned rooms and a bar. Well situated in the Shinjuku Ward district, the property is situated 2.6 km from Shinjuku Gyoen National Garden and 2.9 km from Meiji Jingu Shrine. The accommodation provides a 24-hour front desk and luggage storage space for guests.</p>'
  },
  {
    id: 6,
    name: 'HUNDRED STAY Tokyo Shinjuku',
    rating: 6.7,
    stars: 3,
    address: '2 27 7 Hyakunincho Shinjuku Ku, Japan',
    photo: 'https://d2ey9sqrvkqdfs.cloudfront.net/gS3z/i16_m.jpg',
    description: '<p>A stay at HUNDRED STAY Tokyo Shinjuku places you in the heart of Tokyo, walking distance from Museum of Haiku Literature and Kaichuinari Shrine. This hotel is within close proximity of Narukoten Shrine and Okubo Park.</p> <br> <p>Make yourself at home in one of the 102 guestrooms featuring refrigerators and LCD televisions. Wired and wireless Internet access is complimentary, while iPod docking stations and digital programming provide entertainment. Private bathrooms with shower/tub combinations feature deep soaking bathtubs and complimentary toiletries. Conveniences include phones, as well as safes and desks.</p> <br> <p>Pamper yourself with onsite massages or enjoy recreation amenities such as a health club. Additional amenities include complimentary wireless Internet access and concierge services.</p> <br> <p>You can enjoy a meal at a restaurant serving the guests of HUNDRED STAY Tokyo Shinjuku, or find a snack in a coffee shop/café. Continental breakfasts are available daily for a fee.</p> <br> <p>Featured amenities include complimentary high-speed (wired) Internet access, a business center, and complimentary newspapers in the lobby.</p>'
  }
]

export const MOCK_PRICES_SGD: Price[] = [
  {
    id: 1,
    price: 164,
    competitors: {
      Traveloka: 190,
      Expedia: 163
    },
    taxes_and_fees: {
      tax: 13.12,
      hotel_fees: 16.4
    }
  },
  {
    id: 2,
    price: 1150,
    competitors: {
      Traveloka: 1000
    },
    taxes_and_fees: {
      tax: 92,
      hotel_fees: 115
    }
  },
  {
    id: 3,
    price: 979.74,
    competitors: {
      Expedia: 981.88,
      Prestigia: 801.62
    }
  },
  {
    id: 4,
    price: 212.39,
    competitors: {
      Kayak: 230.52,
      getaroom: 250
    }
  },
  {
    id: 7,
    price: 168.5,
    taxes_and_fees: {
      tax: 13.48,
      hotel_fees: 16.85
    }
  },
  {
    id: 8,
    price: 168.5,
    taxes_and_fees: {
      tax: 13.48,
      hotel_fees: 16.85
    }
  }
]

export const MOCK_PRICES_KRW = [
  {
    id: 1,
    price: 134434.8,
    competitors: {
      'Booking.com': 135154.89,
      'Hotels.com': 135486.56,
      Expedia: 134989.05,
      getaroom: 137642.4,
      'AMOMA.com': 149250.8
    }
  },
  {
    id: 2,
    price: 942163.89
  },
  {
    id: 3,
    price: 801007.35,
    competitors: {
      Expedia: 812604.25,
      Prestigia: 663419.79
    }
  },
  {
    id: 4,
    price: 173644.95
  },
  {
    id: 5,
    price: 135555.09,
    competitors: {
      Prestigia: 137642.4,
      Kayak: 156796.25
    }
  },
  {
    id: 6,
    price: 106427.55,
    competitors: {
      Prestigia: 132667.37,
      'Booking.com': 116083.95
    }
  },
  {
    id: 7,
    price: 137795.67
  },
  {
    id: 8,
    price: 137795.67
  }
]
