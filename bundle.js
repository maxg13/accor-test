(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby(lat, lng, radius) {
	const hotels = hotelService.getHotels()
	const hotelsNearBy = []
	hotels.forEach(hotel => {
		const hotelDistance = helper.distance(lat, lng, hotel.latitude, hotel.longitude)
		if (hotelDistance <= radius) {
			hotel.distance = Math.round(hotelDistance)
			hotelsNearBy.push(hotel)
		}
	})
	return hotelsNearBy
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
	const hotelsNearBy = findHotelBestOffer(lat, lng, radius, date)
	let lowerCoastHotel = null
	let lowerPrice = null
	hotelsNearBy.forEach(hotel => {
		if (!lowerPrice || lowerPrice > hotel.offer.price) {
			lowerPrice = hotel.offer.price
			lowerCoastHotel = hotel
		}
	})
	return lowerCoastHotel
}

function findHotelBestOffer (lat, lng, radius, date) {
	const hotelsNearBy = findHotelsNearby(lat, lng, radius)
	const offers = priceService.getPrices()
	hotelsNearBy.forEach(hotel => {
		const hotelOffers = offers.find(offer => offer.ridCode === hotel.ridCode).offers
		let lowerCoastOffer = null
		let lowerPrice = null
		hotelOffers.forEach(offer => {
			if (offer.date === date && (!lowerPrice || lowerPrice > offer.price)) {
				lowerPrice = offer.price
				lowerCoastOffer = offer
			}
		})
		hotel.offer = lowerCoastOffer
	})
	return hotelsNearBy
}

module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}

},{"./services/helper":5,"./services/hotel-service":6,"./services/price-service":7}],2:[function(require,module,exports){
const finders = require('./app.js');

finders.findHotelsNearby()
finders.findHotelNearbyWithBestOffer()
},{"./app.js":1}],3:[function(require,module,exports){
module.exports={
  "hotels": [
    {
      "ridCode": "A3C7",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.3052585,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "14 Rue Dagobert, 92110 CLICHY",
      "latitude": 48.9030484,
      "commercialName": "ibis Styles Paris Mairie de Clichy"
    },
    {
      "ridCode": "6786",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.282365,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "20 rue d'Oradour sur Glane, 75015 PARIS",
      "latitude": 48.831318,
      "commercialName": "Aparthotel Adagio Paris XV"
    },
    {
      "ridCode": "8538",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.358322,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "212 avenue du Psdt Wilson, 93210 LA PLAINE SAINT DENIS",
      "latitude": 48.914283,
      "commercialName": "ibis Styles Paris Saint-Denis Plaine"
    },
    {
      "ridCode": "2602",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.298812,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "110 rue Jean Bleuzen, 92170 VANVES",
      "latitude": 48.824234,
      "commercialName": "ibis budget Paris Porte de Vanves"
    },
    {
      "ridCode": "A026",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.305978,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "122 Avenue Pierre Brossolette, 92240 MALAKOFF",
      "latitude": 48.816804,
      "commercialName": "H\u00f4tel Mercure Paris Malakoff Parc des Expositions"
    },
    {
      "ridCode": "8078",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.323451,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "32 Rue des Plantes, 75014 PARIS",
      "latitude": 48.83017,
      "commercialName": "ibis Styles Paris Al\u00e9sia Montparnasse"
    },
    {
      "ridCode": "1407",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.185253,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "16, boulevard de l'Hopital Stell, 92500 RUEIL MALMAISON",
      "latitude": 48.880188,
      "commercialName": "ibis Paris Rueil-Malmaison"
    },
    {
      "ridCode": "8518",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.282697,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "48 rue Chaptal, 92300 LEVALLOIS PERRET",
      "latitude": 48.889634,
      "commercialName": "H\u00f4tel Mercure Paris Levallois-Perret"
    },
    {
      "ridCode": "3086",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.416118,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2, Avenue L\u00e9on Gaumont, 75020 PARIS",
      "latitude": 48.849468,
      "commercialName": "ibis budget Paris Porte de Vincennes"
    },
    {
      "ridCode": "B132",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.278538,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "19 Rue Paul Vaillant Couturier, 92300 LEVALLOIS PERRET",
      "latitude": 48.894045,
      "commercialName": "H\u00f4tel Mercure Paris Pont de Levallois Neuilly"
    },
    {
      "ridCode": "5091",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.361506,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "7-9 Impasse Marteau, 75018 PARIS",
      "latitude": 48.9016,
      "commercialName": "ibis budget Paris Nord 18\u00e8me"
    },
    {
      "ridCode": "7847",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.380612,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "53 rue Richard Lenoir, 75011 PARIS",
      "latitude": 48.857251,
      "commercialName": "H\u00f4tel Mercure Paris Bastille Marais"
    },
    {
      "ridCode": "9292",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.355783,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "31 33 Rue De Saint Quentin, 75010 PARIS",
      "latitude": 48.879208,
      "commercialName": "ibis Paris Gare du Nord TGV"
    },
    {
      "ridCode": "6793",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.313547,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "131 Boulevard Haussmann, 75008 PARIS",
      "latitude": 48.875194,
      "commercialName": "Aparthotel Adagio Paris Haussmann"
    },
    {
      "ridCode": "A6Q1",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.2738034,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "11 Bis Rue Du Clos Montholon, 92140 CLAMART",
      "latitude": 48.8144413,
      "commercialName": "ibis Styles Clamart Gare Grand Paris"
    },
    {
      "ridCode": "2573",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.500466,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "14, all\u00e9e du plateau, 93250 VILLEMOMBLE",
      "latitude": 48.880308,
      "commercialName": "ibis budget Villemomble"
    },
    {
      "ridCode": "A9V3",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.358467,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "5 Rue Saint Laurent, 75010 PARIS",
      "latitude": 48.875226,
      "commercialName": "ibis Paris Gare de L'Est 10\u00e8me"
    },
    {
      "ridCode": "2897",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.343006,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "14 rue de la Sorbonne, 75005 PARIS",
      "latitude": 48.849171,
      "commercialName": "H\u00f4tel Mercure Paris La Sorbonne Saint-Germain-des-Pr\u00e9s"
    },
    {
      "ridCode": "A025",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.336389,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "21 Boulevard de Clichy, 75009 Paris",
      "latitude": 48.8825,
      "commercialName": "H\u00f4tel Mercure Paris 9 Pigalle Sacr\u00e9-Coeur"
    },
    {
      "ridCode": "1875",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.315379,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "71 boulevard de Vaugirard, 75015 PARIS",
      "latitude": 48.840402,
      "commercialName": "ibis Paris Gare Montparnasse 15\u00e8me"
    },
    {
      "ridCode": "6357",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.400242,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "5 all\u00e9e de la Seine, 94200 IVRY SUR SEINE",
      "latitude": 48.818298,
      "commercialName": "H\u00f4tel Mercure Paris Ivry Quai de Seine"
    },
    {
      "ridCode": "2792",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.364045,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "Rue de la Cokerie, 93210 LA PLAINE SAINT DENIS",
      "latitude": 48.921216,
      "commercialName": "ibis Paris Saint-Denis Stade Sud"
    },
    {
      "ridCode": "A064",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.383723,
      "brandCode": "MGA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22 24 Rue Faidherbe, 75011 Paris",
      "latitude": 48.851725,
      "commercialName": "H\u00f4tel Paris Bastille Boutet - MGallery"
    },
    {
      "ridCode": "7976",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.373995,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "21 rue de Tolbiac, 75013 PARIS",
      "latitude": 48.829025,
      "commercialName": "ibis Styles Paris Tolbiac Biblioth\u00e8que"
    },
    {
      "ridCode": "8368",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.38487,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "28 bis avenue Corentin Cariou, 75019 PARIS",
      "latitude": 48.896724,
      "commercialName": "Aparthotel Adagio access Paris la Villette"
    },
    {
      "ridCode": "1401",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.384766,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "31-35, quai de l'Oise, 75019 PARIS",
      "latitude": 48.891321,
      "commercialName": "ibis Paris la Villette Cit\u00e9 des Sciences 19\u00e8me"
    },
    {
      "ridCode": "9688",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.350098,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "42 rue des Petites Ecuries, 75010 PARIS",
      "latitude": 48.874042,
      "commercialName": "H\u00f4tel Mercure Paris Op\u00e9ra Grands Boulevards"
    },
    {
      "ridCode": "2053",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.295988,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3 rue Brey, 75017 PARIS",
      "latitude": 48.875976,
      "commercialName": "H\u00f4tel Mercure Paris Arc de Triomphe Wagram"
    },
    {
      "ridCode": "B6F9",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.372834,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3 Rue Parrot, 75012 PARIS",
      "latitude": 48.846898,
      "commercialName": "Mercure Paris Gare de Lyon Op\u00e9ra Bastille"
    },
    {
      "ridCode": "2217",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.372532,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2 place Louis Armand, 75012 PARIS",
      "latitude": 48.844779,
      "commercialName": "H\u00f4tel Mercure Paris Gare de Lyon TGV"
    },
    {
      "ridCode": "1609",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.168289,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "21 Avenue Edouard Belin, 92500 RUEIL MALMAISON",
      "latitude": 48.888335,
      "commercialName": "Novotel Paris Rueil-Malmaison"
    },
    {
      "ridCode": "1131",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.288085,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "69 boulevard Victor, 75015 PARIS",
      "latitude": 48.832895,
      "commercialName": "H\u00f4tel Mercure Paris Vaugirard Porte de Versailles"
    },
    {
      "ridCode": "B6W6",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.375546,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "28 Bis Boulevard Diderot, 75012 PARIS",
      "latitude": 48.845977,
      "commercialName": "ibis Styles Paris Gare de Lyon TGV (Opening September 2021)"
    },
    {
      "ridCode": "8400",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.342373,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "10 Rue du Docteur Finot, 93200 SAINT DENIS",
      "latitude": 48.918364,
      "commercialName": "Aparthotel Adagio access Paris Saint-Denis Pleyel"
    },
    {
      "ridCode": "0900",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.368486,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "12, rue Louis Blanc, 75010 PARIS",
      "latitude": 48.879274,
      "commercialName": "ibis Paris Canal Saint-Martin"
    },
    {
      "ridCode": "2539",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.332756,
      "brandCode": "HOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "29, Rue du Docteur Babinski, 75018 PARIS",
      "latitude": 48.901018,
      "commercialName": "hotelF1 Paris Saint-Ouen - March\u00e9 aux Puces (r\u00e9nov\u00e9)"
    },
    {
      "ridCode": "3186",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.307146,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 rue Georges Cor\u00e8te, 92230 GENNEVILLIERS",
      "latitude": 48.917847,
      "commercialName": "ibis budget Gennevilliers Asni\u00e8res"
    },
    {
      "ridCode": "0941",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.381206,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "77 rue de Bercy, 75012 PARIS",
      "latitude": 48.83859,
      "commercialName": "ibis Styles Paris Bercy"
    },
    {
      "ridCode": "2023",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.358455,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "6, Rue St Laurent, 75010 PARIS",
      "latitude": 48.875439,
      "commercialName": "ibis Paris Gare de l'Est TGV"
    },
    {
      "ridCode": "0785",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.346531,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "8 Place Marguerite de Navarre, 75001 PARIS",
      "latitude": 48.86053,
      "commercialName": "Novotel Paris Les Halles"
    },
    {
      "ridCode": "A242",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.310423,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "60 Avenue Pierre Brossolette, 92240 MALAKOFF",
      "latitude": 48.819719,
      "commercialName": "Aparthotel Adagio Paris Malakoff Ch\u00e2tillon"
    },
    {
      "ridCode": "7326",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.252219,
      "brandCode": "MGA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "13 rue Nungesser et Coli, 75016 Paris",
      "latitude": 48.844653,
      "commercialName": "H\u00f4tel Molitor Paris - MGallery"
    },
    {
      "ridCode": "8984",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.385693,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "13 Rue De Reuilly, 75012 PARIS",
      "latitude": 48.849053,
      "commercialName": "Aparthotel Adagio access Paris Reuilly"
    },
    {
      "ridCode": "8245",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.356729,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "11 Rue de Dunkerque, 75010 PARIS",
      "latitude": 48.879585,
      "commercialName": "ibis Styles Paris Gare du Nord TGV"
    },
    {
      "ridCode": "1191",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.352828,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "25 boulevard Auguste Blanqui, 75013 PARIS",
      "latitude": 48.830305,
      "commercialName": "H\u00f4tel Mercure Paris Place d'Italie"
    },
    {
      "ridCode": "7402",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.342037,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "19 Rue Buffault, 75009 PARIS",
      "latitude": 48.876001,
      "commercialName": "Ibis Paris Op\u00e9ra La Fayette 9\u00e8me"
    },
    {
      "ridCode": "1614",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.339519,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "95 Rue de Richelieu, 75002 PARIS",
      "latitude": 48.871137,
      "commercialName": "H\u00f4tel Mercure Paris Op\u00e9ra Louvre"
    },
    {
      "ridCode": "8371",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.288292,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "43 rue Saint Charles, 75015 PARIS",
      "latitude": 48.849635,
      "commercialName": "Aparthotel Adagio access Paris Tour Eiffel Saint-Charles"
    },
    {
      "ridCode": "0747",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.253039,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2 Boulevard de Neuilly, 92081 LA DEFENSE",
      "latitude": 48.88805,
      "commercialName": "NOVOTEL PARIS LA DEFENSE ESPLANADE"
    },
    {
      "ridCode": "1913",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.326376,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 rue de l 'Isly, 75008 PARIS",
      "latitude": 48.874806,
      "commercialName": "Mercure Paris Op\u00e9ra Garnier H\u00f4tel & Spa"
    },
    {
      "ridCode": "8987",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.243705,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "70 rue Roque de Fillol, 92800 PUTEAUX",
      "latitude": 48.884509,
      "commercialName": "Aparthotel Adagio access La D\u00e9fense Puteaux"
    },
    {
      "ridCode": "0912",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.247219,
      "brandCode": "MGA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "33 voie des sculpteurs\" GPS\", 92060 PARIS LA DEFENSE",
      "latitude": 48.888134,
      "commercialName": "NEST Paris La Defense - MGallery (Ex Sofitel)"
    },
    {
      "ridCode": "9375",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.349275,
      "brandCode": "MGA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "38 Rue De L'Echiquier, 75010 PARIS",
      "latitude": 48.871806,
      "commercialName": "H\u00f4tel L'\u00c9chiquier Op\u00e9ra Paris - MGallery"
    },
    {
      "ridCode": "8643",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.385443,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "9 rue de Reuilly, 75012 PARIS",
      "latitude": 48.849453,
      "commercialName": "ibis Paris Gare de Lyon Reuilly"
    },
    {
      "ridCode": "6243",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.256274,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "63 Place Ren\u00e9 Clair, 92100 BOULOGNE BILLANCOURT",
      "latitude": 48.833827,
      "commercialName": "Apparthotel Mercure Paris Boulogne"
    },
    {
      "ridCode": "2712",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.459032,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "252 Rue du Mar\u00e9chal Leclerc, 94410 Saint Maurice",
      "latitude": 48.815953,
      "commercialName": "ibis budget Saint-Maurice"
    },
    {
      "ridCode": "9734",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.324083,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "185 Boulevard Brune, 75014 PARIS",
      "latitude": 48.823818,
      "commercialName": "H\u00f4tel Mercure Paris Al\u00e9sia"
    },
    {
      "ridCode": "3239",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.414956,
      "brandCode": "SUI",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22 Avenue du professeur lemierre, 75020 PARIS",
      "latitude": 48.855823,
      "commercialName": "Novotel Suites Paris Montreuil Vincennes"
    },
    {
      "ridCode": "A8R1",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.32094,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "9 Rue De Constantinople, 75008 PARIS",
      "latitude": 48.879695,
      "commercialName": "ibis Styles Paris Gare Saint-Lazare"
    },
    {
      "ridCode": "3176",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.306979,
      "brandCode": "HOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "Avenue Laurent C\u00e9ly, 92230 GENNEVILLIERS",
      "latitude": 48.917987,
      "commercialName": "hotelF1 Paris Gennevilliers (r\u00e9nov\u00e9)"
    },
    {
      "ridCode": "1554",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.212458,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "36/38 avenue  Champs Pierreux, 92000 NANTERRE",
      "latitude": 48.888395,
      "commercialName": "ibis Nanterre la D\u00e9fense"
    },
    {
      "ridCode": "2012",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.415361,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2, avenue du Prof. A. Lemierre, 75020 PARIS",
      "latitude": 48.854452,
      "commercialName": "ibis Paris Porte de Montreuil"
    },
    {
      "ridCode": "6987",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.312002,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "96 Rue Gabriel Peri, 92120 MONTROUGE",
      "latitude": 48.81987,
      "commercialName": "Aparthotel Adagio Paris Montrouge"
    },
    {
      "ridCode": "B1C3",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.292336,
      "brandCode": "MSH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "20 Av. de la Porte de la Plaine, 75015 PARIS",
      "latitude": 48.829383,
      "commercialName": "Mama Shelter Paris West"
    },
    {
      "ridCode": "B5D8",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.3582936,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 Rue Sibour, 75010 PARIS",
      "latitude": 48.8751474,
      "commercialName": "ibis Styles Paris Gare de l'Est Magenta (Opening January)"
    },
    {
      "ridCode": "2955",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.278836,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "10 Avenue Emile Zola, 75015 PARIS",
      "latitude": 48.846127,
      "commercialName": "H\u00f4tel Mercure Paris Tour Eiffel Pont Mirabeau"
    },
    {
      "ridCode": "4982",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.375807,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "57-63, Avenue Jean Jaur\u00e8s, 75019 PARIS",
      "latitude": 48.884269,
      "commercialName": "ibis budget Paris La Villette 19\u00e8me"
    },
    {
      "ridCode": "1735",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.375301,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2 rue Hector Malot, 75012 PARIS",
      "latitude": 48.84538,
      "commercialName": "Novotel Paris Gare de Lyon"
    },
    {
      "ridCode": "3491",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.37993,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "53-61,rue de la Commune de Paris, 93300 AUBERVILLIERS",
      "latitude": 48.910374,
      "commercialName": "ibis budget Paris Aubervilliers"
    },
    {
      "ridCode": "7229",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.293221,
      "brandCode": "PUL",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "18 avenue de Suffren, 75015 PARIS",
      "latitude": 48.855976,
      "commercialName": "Pullman Paris Tour Eiffel"
    },
    {
      "ridCode": "1914",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.344927,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "7 rue de Trevise, 75009 PARIS",
      "latitude": 48.872809,
      "commercialName": "H\u00f4tel Mercure Paris Op\u00e9ra Lafayette (ferm\u00e9)"
    },
    {
      "ridCode": "1400",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.301453,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2, rue Cambronne, 75015 PARIS",
      "latitude": 48.847653,
      "commercialName": "ibis Paris Tour Eiffel Cambronne 15\u00e8me"
    },
    {
      "ridCode": "5269",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.356021,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "6/15, Rue Elis\u00e9e Reclus, 94270 KREMLIN BICETRE",
      "latitude": 48.814522,
      "commercialName": "ibis budget Paris Porte d'Italie Ouest"
    },
    {
      "ridCode": "0935",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.380797,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "85 rue de Bercy, 75012 PARIS",
      "latitude": 48.838944,
      "commercialName": "Novotel Paris Centre Bercy"
    },
    {
      "ridCode": "B431",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.287592,
      "brandCode": "JOE",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "61, 75009 PARIS",
      "latitude": 48.862725,
      "commercialName": "JO&JOE Paris Nation (Ouverture Janvier 2021)"
    },
    {
      "ridCode": "9297",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.25268,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2-4 Place des Pl\u00e9iades, 92400 COURBEVOIE",
      "latitude": 48.893775,
      "commercialName": "Aparthotel Adagio La D\u00e9fense Courbevoie"
    },
    {
      "ridCode": "7115",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.263317,
      "brandCode": "SUI",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "86 Rue Camille Desmoulins, 92130 ISSY LES MOULINEAUX",
      "latitude": 48.829056,
      "commercialName": "Novotel Suites Paris Issy-les-Moulineaux"
    },
    {
      "ridCode": "A5D5",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.300153,
      "brandCode": "RAF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "37 Avenue Hoche, 75008 PARIS",
      "latitude": 48.875798,
      "commercialName": "Le Royal Monceau - Raffles Paris"
    },
    {
      "ridCode": "0981",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.344612,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "5  rue de Montyon, 75009 PARIS",
      "latitude": 48.873059,
      "commercialName": "H\u00f4tel Mercure Paris Op\u00e9ra Faubourg Montmartre"
    },
    {
      "ridCode": "8575",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.35939,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "175 rue la Fayette, 75010 PARIS",
      "latitude": 48.8799,
      "commercialName": "H\u00f4tel Mercure Paris Gare du Nord La Fayette"
    },
    {
      "ridCode": "B5U8",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.4290801027,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "52 Avenue Gaston Roussel, 93230 ROMAINVILLE",
      "latitude": 48.8945560776,
      "commercialName": "ibis Styles Paris Romainville"
    },
    {
      "ridCode": "2189",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.316935,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "10 rue Bernard Buffet, 75017 PARIS",
      "latitude": 48.892219,
      "commercialName": "ibis Paris 17 Clichy-Batignolles"
    },
    {
      "ridCode": "6787",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.236297,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 Rue des Lilas d'Espagne, 92400 COURBEVOIE",
      "latitude": 48.897259,
      "commercialName": "Aparthotel Adagio La D\u00e9fense Le Parc"
    },
    {
      "ridCode": "8447",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.288842,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "16 Rue des Fr\u00e8res Chausson, 92600 ASNIERES SUR SEINE",
      "latitude": 48.915904,
      "commercialName": "Aparthotel Adagio access Paris Asni\u00e8res"
    },
    {
      "ridCode": "0351",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.329842,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "207 Boulevard Raspail, 75014 PARIS",
      "latitude": 48.841369,
      "commercialName": "H\u00f4tel Mercure Paris Montparnasse Raspail"
    },
    {
      "ridCode": "0803",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.322892,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "160, rue du Ch\u00e2teau, 75014 PARIS",
      "latitude": 48.833711,
      "commercialName": "ibis Paris Maine Montparnasse 14\u00e8me"
    },
    {
      "ridCode": "0372",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.295069,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "27 avenue des Ternes, 75017 PARIS",
      "latitude": 48.878381,
      "commercialName": "H\u00f4tel Mercure Paris Arc de Triomphe \u00c9toile"
    },
    {
      "ridCode": "1037",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.488382,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "Avenue des Olympiades, 94120 FONTENAY SOUS BOIS",
      "latitude": 48.85407,
      "commercialName": "H\u00f4tel Mercure Paris Val de Fontenay"
    },
    {
      "ridCode": "1610",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.331288,
      "brandCode": "MGS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22  rue Danielle Casanova, 75002 PARIS",
      "latitude": 48.868062,
      "commercialName": "H\u00f4tel Stendhal Place Vend\u00f4me Paris - MGallery"
    },
    {
      "ridCode": "9586",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.379372,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 Rue Petit, 75019 PARIS",
      "latitude": 48.884484,
      "commercialName": "ibis Styles Paris Buttes-Chaumont"
    },
    {
      "ridCode": "5037",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.415213,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "278-280, Rue de Paris, 93100 MONTREUIL",
      "latitude": 48.854331,
      "commercialName": "ibis budget Paris Porte de Montreuil"
    },
    {
      "ridCode": "0959",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.321012,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "49, rue des Plantes, 75014 PARIS",
      "latitude": 48.827499,
      "commercialName": "ibis Paris Al\u00e9sia Montparnasse 14\u00e8me"
    },
    {
      "ridCode": "2587",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.394166,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2, place de l'Europe, 94220 CHARENTON LE PONT",
      "latitude": 48.825304,
      "commercialName": "ibis budget Paris Porte de Bercy"
    },
    {
      "ridCode": "5060",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.315204,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "17 rue du Cotentin, 75015 PARIS",
      "latitude": 48.838455,
      "commercialName": "Novotel Paris Centre Gare Montparnasse"
    },
    {
      "ridCode": "4983",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.359529,
      "brandCode": "SUI",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 Impasse Marteau, 75018 PARIS",
      "latitude": 48.901582,
      "commercialName": "Novotel Suites Paris Nord 18\u00e8me"
    },
    {
      "ridCode": "6223",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.355741,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1-3 Cour de la Ferme St Lazare, 75010 PARIS",
      "latitude": 48.876006,
      "commercialName": "H\u00f4tel Mercure Paris Gare de l'Est Magenta"
    },
    {
      "ridCode": "B1P0",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.408013,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "96 Cours De Vincennes, 75012 PARIS",
      "latitude": 48.846876,
      "commercialName": "ibis Styles Paris Nation Cours de Vincennes"
    },
    {
      "ridCode": "A533",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.473537,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 Boulevard De Creteil, 94100 SAINT MAUR DES FOSSES",
      "latitude": 48.798969,
      "commercialName": "ibis Styles Saint-Maur Cr\u00e9teil"
    },
    {
      "ridCode": "6791",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.387656,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3 - 5 Cours du 7\u00e8me Art, 75019 PARIS",
      "latitude": 48.878109,
      "commercialName": "Aparthotel Adagio Paris Buttes-Chaumont"
    },
    {
      "ridCode": "A780",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.330929,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "115 Avenue Gabriel Peri, 93400 SAINT OUEN",
      "latitude": 48.902654,
      "commercialName": "H\u00f4tel Mercure Paris Saint-Ouen"
    },
    {
      "ridCode": "8367",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.396774,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "50 boulevard de Brandebourg, 94200 IVRY SUR SEINE",
      "latitude": 48.814664,
      "commercialName": "Aparthotel Adagio access Paris Quai d'Ivry"
    },
    {
      "ridCode": "0374",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.329034,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "13 rue Francois Ory, 92120 MONTROUGE",
      "latitude": 48.81801,
      "commercialName": "H\u00f4tel Mercure Paris Porte d'Orl\u00e9ans"
    },
    {
      "ridCode": "3488",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.4167,
      "brandCode": "HOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "290-302, Rue Etienne Marcel, 93170 BAGNOLET",
      "latitude": 48.855876,
      "commercialName": "hotelF1 Paris Porte de Montreuil (r\u00e9nov\u00e9)"
    },
    {
      "ridCode": "6950",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.344952,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3/5 rue de Trevise, 75009 PARIS",
      "latitude": 48.872646,
      "commercialName": "ibis Styles Paris Lafayette Op\u00e9ra (ferm\u00e9 )"
    },
    {
      "ridCode": "0663",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.329937,
      "brandCode": "SOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1  rue Scribe, 75009 PARIS",
      "latitude": 48.870426,
      "commercialName": "Sofitel Le Scribe Paris Op\u00e9ra"
    },
    {
      "ridCode": "A0Y0",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.409515,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "36 Rue De La Croix Saint Simon, 75020 Paris",
      "latitude": 48.855163,
      "commercialName": "ibis Styles Paris Nation Porte de Montreuil"
    },
    {
      "ridCode": "3296",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.262068,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "39 Quai Paul Doumer, 92400 COURBEVOIE",
      "latitude": 48.895647,
      "commercialName": "ibis Paris la D\u00e9fense Courbevoie"
    },
    {
      "ridCode": "B799",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.309020178,
      "brandCode": "SAM",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "75008 PARIS",
      "latitude": 48.86571266,
      "commercialName": "La R\u00e9sidence Du Roy Paris Champs Elys\u00e9es"
    },
    {
      "ridCode": "9685",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.345198,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "20 Rue du Sommerard, 75005 PARIS",
      "latitude": 48.850247,
      "commercialName": "H\u00f4tel Mercure Paris Notre-Dame Saint-Germain-des-Pr\u00e9s"
    },
    {
      "ridCode": "2953",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.341996,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "38 Rue du Faubourg Montmartre, 75009 PARIS",
      "latitude": 48.874335,
      "commercialName": "ibis Paris Grands Boulevards Op\u00e9ra 9\u00e8me"
    },
    {
      "ridCode": "7265",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.203438,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "38 AVENUE GEORGES CLEMENCEAU, 92000 NANTERRE",
      "latitude": 48.886838,
      "commercialName": "ibis budget Nanterre La D\u00e9fense"
    },
    {
      "ridCode": "1834",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.325805,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15, 17, 21 boulevard Romain, 75014 PARIS",
      "latitude": 48.819773,
      "commercialName": "Novotel Paris 14 Porte d'Orl\u00e9ans"
    },
    {
      "ridCode": "9921",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.402793,
      "brandCode": "MSH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "109 Rue De Bagnolet, 75020 PARIS",
      "latitude": 48.859735,
      "commercialName": "Mama Shelter Paris East"
    },
    {
      "ridCode": "2559",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.325959,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15 - 21 boulevard romain rolland, 75014 PARIS",
      "latitude": 48.819779,
      "commercialName": "ibis budget Paris Porte d'Orl\u00e9ans"
    },
    {
      "ridCode": "6277",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.248914,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3 bis, rue de Paris, 92190 MEUDON",
      "latitude": 48.817215,
      "commercialName": "ibis budget Meudon Paris Ouest"
    },
    {
      "ridCode": "B793",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.33005,
      "brandCode": "SAM",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "221 rue Saint Honore, 75001 PARIS",
      "latitude": 48.8658,
      "commercialName": "Hotel Royal Saint Honore Paris Louvre"
    },
    {
      "ridCode": "1546",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.250352,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "18 - 30 rue Baudin, 92400 COURBEVOIE",
      "latitude": 48.895167,
      "commercialName": "H\u00f4tel Mercure Paris La D\u00e9fense"
    },
    {
      "ridCode": "8361",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.248971,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 rue de Bitche, 92400 COURBEVOIE",
      "latitude": 48.894929,
      "commercialName": "Aparthotel Adagio access La D\u00e9fense Place Charras"
    },
    {
      "ridCode": "8816",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.3940970661,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "216 Avenue Jean Jaures, 75019 PARIS",
      "latitude": 48.8889580678,
      "commercialName": "H\u00f4tel Mercure Paris 19 Philharmonie La Villette"
    },
    {
      "ridCode": "3546",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.282836,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "61 quai de Grenelle, 75015 PARIS",
      "latitude": 48.849778,
      "commercialName": "Novotel Paris Centre Tour Eiffel"
    },
    {
      "ridCode": "1295",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.321506,
      "brandCode": "SOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15 rue Boissy d'Anglas, 75008 PARIS",
      "latitude": 48.868528,
      "commercialName": "Sofitel Paris Le Faubourg"
    },
    {
      "ridCode": "2354",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.50029,
      "brandCode": "HOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "8 \u00e0 12, All\u00e9e du Plateau, 93250 VILLEMOMBLE",
      "latitude": 48.879139,
      "commercialName": "hotelF1 Villemomble (r\u00e9nov\u00e9)"
    },
    {
      "ridCode": "1982",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.223648,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "17/20 Esplanade Ch. de Gaulle, 92000 NANTERRE",
      "latitude": 48.895195,
      "commercialName": "H\u00f4tel Mercure Paris La D\u00e9fense Grande Arche"
    },
    {
      "ridCode": "9104",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.372839,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "11 rue Moreau, 75012 PARIS",
      "latitude": 48.850148,
      "commercialName": "Aparthotel Adagio access Paris Bastille"
    },
    {
      "ridCode": "7351",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.287427,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "10 bis Rue du Chateau, 92600 ASNIERES SUR SEINE",
      "latitude": 48.906558,
      "commercialName": "ibis Styles Asni\u00e8res Centre"
    },
    {
      "ridCode": "2816",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.248084,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "35 Cours Michelet, 92060 PARIS LA DEFENSE",
      "latitude": 48.887828,
      "commercialName": "Aparthotel Adagio La D\u00e9fense Esplanade"
    },
    {
      "ridCode": "2789",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.289507,
      "brandCode": "SOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "88 bis Avenue Kl\u00e9ber, 75116 PARIS",
      "latitude": 48.866381,
      "commercialName": "Sofitel Paris Baltimore Tour Eiffel"
    },
    {
      "ridCode": "A028",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.300135,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "166 Boulevard de Grenelle, 75015 PARIS",
      "latitude": 48.847862,
      "commercialName": "ibis Styles Paris Eiffel Cambronne"
    },
    {
      "ridCode": "A013",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.367891,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "14 rue Rampon, 75011 Paris",
      "latitude": 48.866522,
      "commercialName": "ibis Paris Avenue de la R\u00e9publique"
    },
    {
      "ridCode": "B2R6",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.397063,
      "brandCode": "HP",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "28 Boulevard D Indochine, 75019 PARIS",
      "latitude": 48.885731,
      "commercialName": "Hipark by Adagio Paris La Villette"
    },
    {
      "ridCode": "0863",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.352679,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "122, rue La Fayette, 75010 PARIS",
      "latitude": 48.878117,
      "commercialName": "ibis Paris Gare du Nord La Fayette 10\u00e8me"
    },
    {
      "ridCode": "8652",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.379615,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "64 Rue Crozatier, 75012 PARIS",
      "latitude": 48.849686,
      "commercialName": "H\u00f4tel Mercure Paris Bastille Saint-Antoine"
    },
    {
      "ridCode": "9296",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.227243,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2 rue Pierre Expert, 92700 Colombes",
      "latitude": 48.914777,
      "commercialName": "Aparthotel Adagio access Colombes La D\u00e9fense"
    },
    {
      "ridCode": "2596",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.260404,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "12, rue Jacques-henri Lartigue, 92130 ISSY-LES-MOULINEAUX",
      "latitude": 48.823917,
      "commercialName": "ibis budget Issy-les-Moulineaux Paris Ouest"
    },
    {
      "ridCode": "2585",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.417342,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3, rue Jean Jaur\u00e8s, 93170 BAGNOLET",
      "latitude": 48.866346,
      "commercialName": "ibis budget Paris Porte de Bagnolet"
    },
    {
      "ridCode": "3325",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.362594,
      "brandCode": "SUI",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "31 Avenue Jules Rimet, 93210 SAINT DENIS",
      "latitude": 48.923618,
      "commercialName": "Novotel Suites Paris Stade de France"
    },
    {
      "ridCode": "8282",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.321731,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22 rue Hippolyte Maindron, 75014 PARIS",
      "latitude": 48.83168,
      "commercialName": "ibis Styles Paris Maine Montparnasse"
    },
    {
      "ridCode": "A4A6",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.346857,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22 Rue Barrault, 75013 PARIS",
      "latitude": 48.828509,
      "commercialName": "ibis Styles Paris Place d'Italie Butte-aux-Cailles"
    },
    {
      "ridCode": "A9I7",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.229804,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "97 Avenue du G\u00e9n\u00e9ral-de-Gaulle, 92800 PUTEAUX",
      "latitude": 48.885817,
      "commercialName": "ibis Styles Puteaux Paris La D\u00e9fense"
    },
    {
      "ridCode": "5302",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.320197,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22 Avenue du Maine, 75015 PARIS",
      "latitude": 48.843332,
      "commercialName": "ibis Paris Tour Montparnasse 15\u00e8me"
    },
    {
      "ridCode": "0634",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.351237,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "13, rue du Val de Marne, 94250 GENTILLY",
      "latitude": 48.81763,
      "commercialName": "ibis Paris Porte d'Italie"
    },
    {
      "ridCode": "6797",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.281439,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "16 rue Eliane Jeannin Garreau, 92130 ISSY LES MOULINEAUX",
      "latitude": 48.831451,
      "commercialName": "Aparthotel Adagio Porte de Versailles"
    },
    {
      "ridCode": "2076",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.385502,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "80, rue de la Folie R\u00e9gnault, 75011 PARIS",
      "latitude": 48.861905,
      "commercialName": "ibis Paris P\u00e8re-Lachaise"
    },
    {
      "ridCode": "A6S7",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.306853,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "118 Rue de Tocqueville, 75017 PARIS",
      "latitude": 48.888137,
      "commercialName": "H\u00f4tel Mercure Paris 17 Batignolles"
    },
    {
      "ridCode": "1937",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.370863,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "41/43 avenue Ledru Rollin, 75012 PARIS",
      "latitude": 48.847692,
      "commercialName": "ibis Paris Gare de Lyon Ledru Rollin 12\u00e8me"
    },
    {
      "ridCode": "B5Z7",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.4567,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "302 Av Paul-Vaillant-Couturier, 93000 BOBIGNY",
      "latitude": 48.9064,
      "commercialName": "ibis Styles Bobigny Centre Pr\u00e9fecture"
    },
    {
      "ridCode": "8465",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.337663,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3 rue Frochot, 75009 PARIS",
      "latitude": 48.881122,
      "commercialName": "ibis Styles Paris Pigalle Montmartre"
    },
    {
      "ridCode": "8365",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.401215,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "203 rue de Paris, 94220 CHARENTON LE PONT",
      "latitude": 48.829319,
      "commercialName": "Aparthotel Adagio access Paris Porte de Charenton"
    },
    {
      "ridCode": "B792",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.3274326,
      "brandCode": "SAM",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "5 rue de Montalembert, 75007 PARIS",
      "latitude": 48.8567126,
      "commercialName": "H\u00f4tel Pont Royal Paris Saint-Germain-des-Pr\u00e9s"
    },
    {
      "ridCode": "0716",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.227188,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "6, rue des Bourets, 92150 SURESNES",
      "latitude": 48.868349,
      "commercialName": "ibis Paris Pont de Suresnes"
    },
    {
      "ridCode": "6792",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.342542,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "10 place Charles Dullin, 75018 PARIS",
      "latitude": 48.883324,
      "commercialName": "Aparthotel Adagio Paris Montmartre"
    },
    {
      "ridCode": "B6S4",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.3175489,
      "brandCode": "TRI",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "176 Rue Cardinet, 75017 PARIS",
      "latitude": 48.8904873,
      "commercialName": "Tribe Paris Batignolles"
    },
    {
      "ridCode": "1978",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.30303,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "257 rue de Vaugirard, 75015 PARIS",
      "latitude": 48.83997,
      "commercialName": "Novotel Paris Vaugirard Montparnasse"
    },
    {
      "ridCode": "7941",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.340948,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "77 rue du Ruisseau, 75018 PARIS",
      "latitude": 48.895103,
      "commercialName": "ibis Styles Paris Montmartre Nord"
    },
    {
      "ridCode": "5038",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.405626,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "111 Boulevard Poniatowski, 75012 PARIS",
      "latitude": 48.834978,
      "commercialName": "ibis Daumesnil Porte Dor\u00e9e"
    },
    {
      "ridCode": "0771",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.251559,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 Boulevard de Neuilly, 92400 COURBEVOIE",
      "latitude": 48.888012,
      "commercialName": "IBIS PARIS LA DEFENSE ESPLANADE"
    },
    {
      "ridCode": "1598",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.29245,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "64 boulevard de Grenelle, 75015 PARIS",
      "latitude": 48.850519,
      "commercialName": "H\u00f4tel Mercure Paris Tour Eiffel Grenelle"
    },
    {
      "ridCode": "8164",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.433296,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "42 Avenue de Paris, 94300 VINCENNES",
      "latitude": 48.845123,
      "commercialName": "Aparthotel Adagio Paris Vincennes"
    },
    {
      "ridCode": "0633",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.417247,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 rue Jean Jaures, 93170 BAGNOLET",
      "latitude": 48.866608,
      "commercialName": "ibis Paris Porte de Bagnolet"
    },
    {
      "ridCode": "3013",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.23954,
      "brandCode": "PUL",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "11 Avenue de l'Arche, 92400 Courbevoie",
      "latitude": 48.894848,
      "commercialName": "Pullman Paris La D\u00e9fense"
    },
    {
      "ridCode": "5586",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.364374,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22  rue Voltaire, 94270 LE KREMLIN BICETRE",
      "latitude": 48.816057,
      "commercialName": "Novotel Paris 13 Porte d'Italie"
    },
    {
      "ridCode": "1969",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.353564,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "8 bis avenue de la Soeur Rosalie, 75013 PARIS",
      "latitude": 48.832021,
      "commercialName": "H\u00f4tel Mercure Paris Gobelins Place d'Italie"
    },
    {
      "ridCode": "3267",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.294668,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "5 Rue Eug\u00e8ne Gibez, 75015 PARIS",
      "latitude": 48.835996,
      "commercialName": "ibis Paris Vaugirard Porte de Versailles"
    },
    {
      "ridCode": "3583",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.261811,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "37 Quai du Pr\u00e9sident Paul Doumer, 92400 COURBEVOIE",
      "latitude": 48.895512,
      "commercialName": "ibis budget Courbevoie Paris la D\u00e9fense 1"
    },
    {
      "ridCode": "1296",
      "countryCode": "FR",
      "localRating": 5.0,
      "longitude": 2.301121,
      "brandCode": "SOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "14  rue Beaujon, 75008 PARIS",
      "latitude": 48.87499,
      "commercialName": "Sofitel Paris Arc de Triomphe"
    },
    {
      "ridCode": "8363",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.234666,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "88 rue des Etudiants, 92400 COURBEVOIE",
      "latitude": 48.896899,
      "commercialName": "Aparthotel Adagio access la D\u00e9fense L\u00e9onard de Vinci"
    },
    {
      "ridCode": "6789",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.386808,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1-7 Cour du Minervois, 75012 PARIS",
      "latitude": 48.831795,
      "commercialName": "Aparthotel Adagio Paris Bercy Village"
    },
    {
      "ridCode": "6923",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.486206,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2-4 Avenue du val de fontenay, 94120 FONTENAY SOUS BOIS",
      "latitude": 48.852646,
      "commercialName": "ibis Styles Paris Val de Fontenay"
    },
    {
      "ridCode": "6788",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.249157,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "73 avenue Gambetta, 92400 COURBEVOIE",
      "latitude": 48.894513,
      "commercialName": "Aparthotel Adagio La D\u00e9fense Kl\u00e9ber"
    },
    {
      "ridCode": "A027",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.211331,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "43 Boulevard De La Republique, 92210 SAINT CLOUD",
      "latitude": 48.84497,
      "commercialName": "H\u00f4tel Mercure Paris Saint-Cloud Hippodrome"
    },
    {
      "ridCode": "3577",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.378806,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "13 Rue Trousseau, 75011 PARIS",
      "latitude": 48.851689,
      "commercialName": "ibis Paris Bastille Faubourg-Saint-Antoine 11\u00e8me"
    },
    {
      "ridCode": "3197",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.345528,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "70 Bis Boulevard Ornano, 75018 PARIS",
      "latitude": 48.896526,
      "commercialName": "ibis Paris Ornano Montmartre Nord 18\u00e8me"
    },
    {
      "ridCode": "3088",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.403697,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "96/98 AVENUE DU GENERAL LECLERC, 93500 PANTIN",
      "latitude": 48.896831,
      "commercialName": "ibis budget Paris Porte de Pantin"
    },
    {
      "ridCode": "6790",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.285438,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "14 rue du Th\u00e9\u00e2tre, 75015 PARIS",
      "latitude": 48.849885,
      "commercialName": "Aparthotel Adagio Paris Centre Tour Eiffel"
    },
    {
      "ridCode": "2192",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.387074,
      "brandCode": "PUL",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 rue de Libourne, 75012 PARIS",
      "latitude": 48.831522,
      "commercialName": "Pullman Paris Centre - Bercy"
    },
    {
      "ridCode": "1549",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.405574,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3-5 place des Marseillais, 94227 CHARENTON LE PONT",
      "latitude": 48.826296,
      "commercialName": "Novotel Paris Sud Porte de Charenton"
    },
    {
      "ridCode": "1823",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.362791,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "197-199 rue La Fayette, 75010 PARIS",
      "latitude": 48.880913,
      "commercialName": "ibis Paris Gare du Nord Ch\u00e2teau-Landon 10\u00e8me"
    },
    {
      "ridCode": "A039",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.243764,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "92 Boulevard de la Republique, 92100 BOULOGNE BILLANCOURT",
      "latitude": 48.83359,
      "commercialName": "ibis Styles Paris Boulogne Marcel Sembat"
    },
    {
      "ridCode": "3298",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.309945,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15, boulevard Victor Hugo, 92110 CLICHY",
      "latitude": 48.897238,
      "commercialName": "ibis Paris Porte de Clichy Centre"
    },
    {
      "ridCode": "9525",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.371477,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "82 84 rue Regnault, 75013 PARIS",
      "latitude": 48.823466,
      "commercialName": "ibis Styles Paris Mass\u00e9na Olympiades"
    },
    {
      "ridCode": "6031",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.363398,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "20, rue Voltaire, 94270 KREMLIN BICETRE",
      "latitude": 48.815859,
      "commercialName": "ibis budget Paris Porte d'Italie Est"
    },
    {
      "ridCode": "3406",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.49233,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "Rue de Nazar\u00e9, 94130 NOGENT SUR MARNE",
      "latitude": 48.832718,
      "commercialName": "ibis Nogent-sur-Marne"
    },
    {
      "ridCode": "1399",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.372763,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15 rue Breguet, 75011 PARIS",
      "latitude": 48.857209,
      "commercialName": "ibis Paris Bastille Op\u00e9ra 11\u00e8me"
    },
    {
      "ridCode": "8189",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.3203257,
      "brandCode": "PUL",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "19 Rue Du Commandant Rene, 75014 PARIS",
      "latitude": 48.8385501,
      "commercialName": "PULLMAN PARIS MONTPARNASSE (ouverture prochaine)"
    },
    {
      "ridCode": "8382",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.292779,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "26 32 rue Jean Bleuzen, 92170 VANVES",
      "latitude": 48.821294,
      "commercialName": "Aparthotel Adagio access Vanves Porte de Versailles"
    },
    {
      "ridCode": "0375",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.292001,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "36 38  rue du moulin, 92170 VANVES",
      "latitude": 48.827125,
      "commercialName": "H\u00f4tel Mercure Paris Porte de Versailles Expo"
    },
    {
      "ridCode": "3326",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.174131,
      "brandCode": "SUI",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "17 Rue Fran\u00e7ois Jacob, 92500 RUEIL MALMAISON",
      "latitude": 48.889889,
      "commercialName": "Novotel Suites Paris Rueil-Malmaison"
    },
    {
      "ridCode": "0905",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.323791,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "20 rue de la Gait\u00e9, 75014 PARIS",
      "latitude": 48.839752,
      "commercialName": "H\u00f4tel Mercure Paris Gare Montparnasse"
    },
    {
      "ridCode": "7952",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.347433,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "11 Bis Rue Pierre Semard, 75009 PARIS",
      "latitude": 48.878063,
      "commercialName": "ibis Styles Paris Cadet Lafayette"
    },
    {
      "ridCode": "B0D0",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.3333,
      "brandCode": "JOE",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "89-93 Av P. Vaillant Couturier, 94250 GENTILLY",
      "latitude": 48.8167,
      "commercialName": "JO&JOE Paris Gentilly"
    },
    {
      "ridCode": "9400",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.305421,
      "brandCode": "SUI",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 Boulevard Brune, 75014 PARIS",
      "latitude": 48.827609,
      "commercialName": "Novotel Suites Paris Expo Porte de Versailles"
    },
    {
      "ridCode": "1143",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.229935,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "7 rue du Port aux Vins, 92150 SURESNES",
      "latitude": 48.870318,
      "commercialName": "Novotel Paris Suresnes Longchamp"
    },
    {
      "ridCode": "2041",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.394129,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "2, Place de l' Europe, 94220 CHARENTON LE PONT",
      "latitude": 48.825239,
      "commercialName": "ibis Paris Porte de Bercy"
    },
    {
      "ridCode": "B045",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.253632,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "19 Avenue Ferdinand Buisson, 75016 PARIS",
      "latitude": 48.836473,
      "commercialName": "ibis Styles Paris 16 Boulogne"
    },
    {
      "ridCode": "5543",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.356396,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15 bis Avenue d'Italie, 75013 PARIS",
      "latitude": 48.829434,
      "commercialName": "ibis Paris Avenue d'Italie 13\u00e8me"
    },
    {
      "ridCode": "2175",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.291969,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "20 rue Jean Rey, 75015 PARIS",
      "latitude": 48.855381,
      "commercialName": "H\u00f4tel Mercure Paris Centre Tour Eiffel"
    },
    {
      "ridCode": "2597",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.334104,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "45 Rue du Docteur BABINSKI, 75018 PARIS",
      "latitude": 48.901021,
      "commercialName": "ibis budget Paris Porte de Montmartre"
    },
    {
      "ridCode": "A7L6",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.292245,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 Av De La Porte De La Plaine, 75015 PARIS",
      "latitude": 48.830077,
      "commercialName": "Novotel Paris Porte de Versailles"
    },
    {
      "ridCode": "1936",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.301942,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "105, rue Brancion, 75015 PARIS",
      "latitude": 48.830247,
      "commercialName": "ibis Paris Brancion Parc des Expositions 15\u00e8me"
    },
    {
      "ridCode": "5479",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.28988,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "24 rue de Trebois, 92300 LEVALLOIS PERRET",
      "latitude": 48.891105,
      "commercialName": "ibis Paris Levallois-Perret"
    },
    {
      "ridCode": "2082",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.413162,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "153, Avenue Jean Lolive, 93500 PANTIN",
      "latitude": 48.893305,
      "commercialName": "ibis Paris Pantin \u00c9glise"
    },
    {
      "ridCode": "0373",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.329923,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "3  rue Caulaincourt, 75018 PARIS",
      "latitude": 48.885048,
      "commercialName": "H\u00f4tel Mercure Paris Montmartre Sacr\u00e9-Coeur"
    },
    {
      "ridCode": "B385",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.355134,
      "brandCode": "TWF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "12 Boulevard de Denain, 75010 PARIS",
      "latitude": 48.879574,
      "commercialName": "25hours Hotel Terminus Nord"
    },
    {
      "ridCode": "B2E6",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.304072,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "4 Rue Marcellin Berthelot, 92110 CLICHY",
      "latitude": 48.903663,
      "commercialName": "ibis Clichy Centre Mairie"
    },
    {
      "ridCode": "B4F3",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.380138,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "64 74 Boulevard De Belleville, 75020 PARIS",
      "latitude": 48.869519,
      "commercialName": "Novotel Paris 20 Belleville (Opening May 2021)"
    },
    {
      "ridCode": "2753",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.357706,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "87 Boulevard de Strasbourg, 75010 PARIS",
      "latitude": 48.875852,
      "commercialName": "ibis Styles Paris Gare de l'Est TGV"
    },
    {
      "ridCode": "6886",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.28023,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "111 Avenue de Verdun, 92320 CHATILLON",
      "latitude": 48.798624,
      "commercialName": "ibis budget Ch\u00e2tillon Paris Ouest"
    },
    {
      "ridCode": "3072",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.364056,
      "brandCode": "HOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "Rue de la Cokerie, 93210 SAINT DENIS",
      "latitude": 48.921209,
      "commercialName": "hotelF1 Paris Saint Denis Stade"
    },
    {
      "ridCode": "6245",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.238572,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "12 Rue de la Ferme, 92100 BOULOGNE BILLANCOURT",
      "latitude": 48.83083,
      "commercialName": "ibis Paris Boulogne-Billancourt"
    },
    {
      "ridCode": "1827",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.294287,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "43, rue Jean  Bleuzen, 92170 VANVES",
      "latitude": 48.822136,
      "commercialName": "ibis Paris Porte de Vanves Parc des Expositions"
    },
    {
      "ridCode": "8386",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.287297,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "5 Rue Aristide Briand, 92170 VANVES",
      "latitude": 48.817693,
      "commercialName": "Aparthotel Adagio access Vanves Porte de Ch\u00e2tillon"
    },
    {
      "ridCode": "B625",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.372,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "52 Avenue Ledru Rollin, 75012 PARIS",
      "latitude": 48.8481,
      "commercialName": "Ibis Styles Paris Gare De Lyon Bastille"
    },
    {
      "ridCode": "A0X1",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.397879,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15 Ter Rue Lamblardie, 75012 PARIS",
      "latitude": 48.8407,
      "commercialName": "Aparthotel Adagio Paris Nation"
    },
    {
      "ridCode": "B096",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.224794,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "30 Av General  Charles De Gaulle, 92150 SURESNES",
      "latitude": 48.870715,
      "commercialName": "H\u00f4tel Mercure Paris Suresnes Longchamp"
    },
    {
      "ridCode": "B4A3",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.223648,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "20 Esplanade Charles De Gaulle, 92000 NANTERRE",
      "latitude": 48.895195,
      "commercialName": "RESIDENCE MERCURE PARIS LA DEFENSE GRANDE ARCHE"
    },
    {
      "ridCode": "7573",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.325682,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "41 avenue Aristide Briand, 92120 MONTROUGE",
      "latitude": 48.818858,
      "commercialName": "ibis Styles Paris Porte d'Orl\u00e9ans"
    },
    {
      "ridCode": "1743",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.38663,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "19, place des Vins de France, 75012 PARIS",
      "latitude": 48.832316,
      "commercialName": "ibis Paris Bercy Village 12\u00e8me"
    },
    {
      "ridCode": "2730",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.362408,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 et 3  rue de Ch\u00e2teau Landon, 75010 PARIS",
      "latitude": 48.878845,
      "commercialName": "ibis Styles Paris Gare de l'Est Ch\u00e2teau Landon"
    },
    {
      "ridCode": "1803",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.358928,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "25, avenue Stephen Pichon, 75013 PARIS",
      "latitude": 48.832524,
      "commercialName": "ibis Paris Place d'Italie 13\u00e8me"
    },
    {
      "ridCode": "1402",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.274901,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15, avenue Jean Jaures, 92130 ISSY LES MOULINEAUX",
      "latitude": 48.823153,
      "commercialName": "ibis Paris Porte de Versailles Mairie d'Issy"
    },
    {
      "ridCode": "8413",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.418897,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "13 Rue Eugene Renault, 94700 MAISONS ALFORT",
      "latitude": 48.815179,
      "commercialName": "Aparthotel Adagio access Paris Maisons-Alfort"
    },
    {
      "ridCode": "7848",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.257139,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "213 Rue Jean Jacques Rousseau, 92130 ISSY LES MOULINEAUX",
      "latitude": 48.822513,
      "commercialName": "ibis Paris Issy-les-Moulineaux Val de Seine"
    },
    {
      "ridCode": "2799",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.39929,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "22 Avenue Jean Lolive, 93500 PANTIN",
      "latitude": 48.890229,
      "commercialName": "H\u00f4tel Mercure Paris Porte de Pantin"
    },
    {
      "ridCode": "0923",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.352598,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "177, rue de Tolbiac, 75013 PARIS",
      "latitude": 48.825818,
      "commercialName": "ibis Paris Italie Tolbiac 13\u00e8me"
    },
    {
      "ridCode": "0635",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.329198,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "33 rue Barb\u00e8s, 92120 MONTROUGE",
      "latitude": 48.817165,
      "commercialName": "ibis Paris Porte d'Orl\u00e9ans"
    },
    {
      "ridCode": "6988",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.328262,
      "brandCode": "ADG",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "43 Rue Caumartin, 75009 PARIS",
      "latitude": 48.872871,
      "commercialName": "Aparthotel Adagio Paris Op\u00e9ra"
    },
    {
      "ridCode": "A5H4",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.423001,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "60 68 Av Henri Barbusse, 93000 BOBIGNY",
      "latitude": 48.905969,
      "commercialName": "ibis budget Bobigny Pantin"
    },
    {
      "ridCode": "B2U6",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.359396,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "12 Avenue de la Porte d'Italie, 75013 PARIS",
      "latitude": 48.817008,
      "commercialName": "Ibis Styles Paris Meteor Avenue d'italie"
    },
    {
      "ridCode": "9880",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.443581,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "15 19 Rue Franklin, 93100 MONTREUIL",
      "latitude": 48.862518,
      "commercialName": "ibis Styles Paris Mairie de Montreuil"
    },
    {
      "ridCode": "3211",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.376373,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "31 Bis  Boulevard Diderot, 75012 PARIS",
      "latitude": 48.846262,
      "commercialName": "ibis Paris Gare de Lyon Diderot 12\u00e8me"
    },
    {
      "ridCode": "0694",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.341561,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "100, Boulevard Rochechouart, 75018 PARIS",
      "latitude": 48.88255,
      "commercialName": "ibis Paris Sacr\u00e9-Coeur 18\u00e8me"
    },
    {
      "ridCode": "9733",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.374565,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "219 Rue De Crimee, 75019 Paris",
      "latitude": 48.892483,
      "commercialName": "ibis Styles Paris Crim\u00e9e La Villette"
    },
    {
      "ridCode": "0934",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.373111,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "6, boulevard Vincent Auriol, 75013 PARIS",
      "latitude": 48.837457,
      "commercialName": "H\u00f4tel Mercure Paris Bercy Biblioth\u00e8que"
    },
    {
      "ridCode": "6188",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.256274,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "37 place Ren\u00e9 Clair, 92100 BOULOGNE BILLANCOURT",
      "latitude": 48.833827,
      "commercialName": "H\u00f4tel Mercure Paris Boulogne"
    },
    {
      "ridCode": "7308",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.289451,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "192 rue de La Croix Nivert, 75015 PARIS",
      "latitude": 48.838707,
      "commercialName": "ibis Styles Paris 15 Lecourbe"
    },
    {
      "ridCode": "0380",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.414708,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "1 Avenue de la Republique, 93177 BAGNOLET",
      "latitude": 48.863202,
      "commercialName": "Novotel Paris Est"
    },
    {
      "ridCode": "8426",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.493585,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "18 Rue de Nazare, 94130 NOGENT SUR MARNE",
      "latitude": 48.832031,
      "commercialName": "Aparthotel Adagio access Nogent-sur-Marne"
    },
    {
      "ridCode": "0751",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.364099,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "9, rue Leon Jouhaux, 75010 PARIS",
      "latitude": 48.86914,
      "commercialName": "ibis Styles Paris R\u00e9publique Le Marais"
    },
    {
      "ridCode": "1979",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.221632,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "11-13 grande rue, 92310 SEVRES",
      "latitude": 48.826951,
      "commercialName": "Novotel Paris Pont de S\u00e8vres"
    },
    {
      "ridCode": "0697",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.330164,
      "brandCode": "IBH",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "5, rue Caulaincourt, 75018 PARIS",
      "latitude": 48.885178,
      "commercialName": "ibis Paris Montmartre 18\u00e8me"
    },
    {
      "ridCode": "B0E4",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.308291,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "18 20 Rue Palloy, 92110 CLICHY",
      "latitude": 48.902581,
      "commercialName": "ibis budget Paris Clichy Mairie"
    },
    {
      "ridCode": "9293",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.2471,
      "brandCode": "IBS",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "99 rue du Capitaine Guynemer, 92400 COURBEVOIE",
      "latitude": 48.8974,
      "commercialName": "ibis Styles Paris La D\u00e9fense Courbevoie"
    },
    {
      "ridCode": "5010",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.316293,
      "brandCode": "HOF",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "23, Ave de la Porte de Ch\u00e2tillon, 75014 PARIS",
      "latitude": 48.823267,
      "commercialName": "hotelF1 Paris Porte de Ch\u00e2tillon (r\u00e9nov\u00e9)"
    },
    {
      "ridCode": "8364",
      "countryCode": "FR",
      "localRating": 0.0,
      "longitude": 2.391023,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "12 rue Pierre Bayle, 75020 PARIS",
      "latitude": 48.858883,
      "commercialName": "Aparthotel Adagio access Philippe Auguste"
    },
    {
      "ridCode": "4987",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.301846,
      "brandCode": "NOV",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "34 avenue de la Porte d'Asni\u00e8res, 75017 PARIS",
      "latitude": 48.891774,
      "commercialName": "Novotel Paris 17"
    },
    {
      "ridCode": "8989",
      "countryCode": "FR",
      "localRating": 3.0,
      "longitude": 2.303761,
      "brandCode": "ADA",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "19-23 avenue Anatole France, 92110 CLICHY",
      "latitude": 48.898614,
      "commercialName": "Aparthotel Adagio access Paris Clichy"
    },
    {
      "ridCode": "3589",
      "countryCode": "FR",
      "localRating": 2.0,
      "longitude": 2.178513,
      "brandCode": "IBB",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "147 Boulevard National, 92500 RUEIL MALMAISON",
      "latitude": 48.890933,
      "commercialName": "ibis budget Rueil-Malmaison"
    },
    {
      "ridCode": "0903",
      "countryCode": "FR",
      "localRating": 4.0,
      "longitude": 2.290459,
      "brandCode": "MER",
      "zoomLevel": 15,
      "streetViewInfo": "",
      "address": "6,  rue Saint Lambert, 75015 PARIS",
      "latitude": 48.838385,
      "commercialName": "H\u00f4tel Mercure Paris 15 Porte de Versailles"
    }
  ]
}
},{}],4:[function(require,module,exports){
module.exports={
  "prices": [
    {
      "ridCode": "A3C7",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "6786",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 124
        }
      ]
    },
    {
      "ridCode": "8538",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 118
        }
      ]
    },
    {
      "ridCode": "2602",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "A026",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 86
        }
      ]
    },
    {
      "ridCode": "8078",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "1407",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "8518",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "3086",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "B132",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 82
        }
      ]
    },
    {
      "ridCode": "5091",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "7847",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 122
        }
      ]
    },
    {
      "ridCode": "9292",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "6793",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "A6Q1",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "2573",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "A9V3",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "2897",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 122
        }
      ]
    },
    {
      "ridCode": "A025",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "1875",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "6357",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "2792",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "A064",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "7976",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 128
        }
      ]
    },
    {
      "ridCode": "8368",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "1401",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 82
        }
      ]
    },
    {
      "ridCode": "9688",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 132
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 132
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 132
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 132
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 132
        }
      ]
    },
    {
      "ridCode": "2053",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "B6F9",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "2217",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "1609",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "1131",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 82
        }
      ]
    },
    {
      "ridCode": "B6W6",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "8400",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "0900",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 88
        }
      ]
    },
    {
      "ridCode": "2539",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "3186",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "0941",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "2023",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "0785",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "A242",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 86
        }
      ]
    },
    {
      "ridCode": "7326",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "8984",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 128
        }
      ]
    },
    {
      "ridCode": "8245",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "1191",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "7402",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "1614",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "8371",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "0747",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "1913",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "8987",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 102
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 134
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 134
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 134
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 134
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 134
        }
      ]
    },
    {
      "ridCode": "0912",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "9375",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 118
        }
      ]
    },
    {
      "ridCode": "8643",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "6243",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "2712",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "9734",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "3239",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "A8R1",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 88
        }
      ]
    },
    {
      "ridCode": "3176",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "1554",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "2012",
      "offers": [
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 80
        }
      ]
    },
    {
      "ridCode": "6987",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 130
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 130
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 130
        }
      ]
    },
    {
      "ridCode": "B1C3",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 78
        }
      ]
    },
    {
      "ridCode": "B5D8",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "2955",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "4982",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "1735",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "3491",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "7229",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "1914",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "1400",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 75
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 80
        }
      ]
    },
    {
      "ridCode": "5269",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "0935",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "B431",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 86
        }
      ]
    },
    {
      "ridCode": "9297",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 124
        }
      ]
    },
    {
      "ridCode": "7115",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "A5D5",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "0981",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "8575",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "B5U8",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "2189",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "6787",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 126
        }
      ]
    },
    {
      "ridCode": "8447",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "0351",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 88
        }
      ]
    },
    {
      "ridCode": "0803",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 92
        }
      ]
    },
    {
      "ridCode": "0372",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "1037",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 92
        }
      ]
    },
    {
      "ridCode": "1610",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 86
        }
      ]
    },
    {
      "ridCode": "9586",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 126
        }
      ]
    },
    {
      "ridCode": "5037",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "0959",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "2587",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "5060",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 92
        }
      ]
    },
    {
      "ridCode": "4983",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 118
        }
      ]
    },
    {
      "ridCode": "6223",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "B1P0",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 72
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 72
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 72
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 72
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 72
        }
      ]
    },
    {
      "ridCode": "A533",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 92
        }
      ]
    },
    {
      "ridCode": "6791",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "A780",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "8367",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 118
        }
      ]
    },
    {
      "ridCode": "0374",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "3488",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "6950",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "0663",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "A0Y0",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 70
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 70
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 70
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 70
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 70
        }
      ]
    },
    {
      "ridCode": "3296",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "B799",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "9685",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 126
        }
      ]
    },
    {
      "ridCode": "2953",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "7265",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "1834",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "9921",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "2559",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "6277",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "B793",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "1546",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "8361",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "8816",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "3546",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "1295",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "2354",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "1982",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "9104",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "7351",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "2816",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "2789",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 122
        }
      ]
    },
    {
      "ridCode": "A028",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "A013",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 78
        }
      ]
    },
    {
      "ridCode": "B2R6",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 86
        }
      ]
    },
    {
      "ridCode": "0863",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "8652",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "9296",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 122
        }
      ]
    },
    {
      "ridCode": "2596",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "2585",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "3325",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "8282",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "A4A6",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "A9I7",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "5302",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "0634",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "6797",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 128
        }
      ]
    },
    {
      "ridCode": "2076",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "A6S7",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "1937",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "B5Z7",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "8465",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "8365",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "B792",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "0716",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "6792",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 118
        }
      ]
    },
    {
      "ridCode": "B6S4",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "1978",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "7941",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "5038",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "0771",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "1598",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "8164",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "0633",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "3013",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "5586",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 118
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 118
        }
      ]
    },
    {
      "ridCode": "1969",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "3267",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "3583",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "1296",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "8363",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "6789",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 130
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 130
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 130
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 130
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 130
        }
      ]
    },
    {
      "ridCode": "6923",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "6788",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 128
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 99
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 128
        }
      ]
    },
    {
      "ridCode": "A027",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 88
        }
      ]
    },
    {
      "ridCode": "3577",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "3197",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "3088",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "6790",
      "offers": [
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "2192",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "1549",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "1823",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "A039",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "3298",
      "offers": [
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "9525",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "6031",
      "offers": [
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 80
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 90
        }
      ]
    },
    {
      "ridCode": "3406",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "1399",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "8189",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 122
        }
      ]
    },
    {
      "ridCode": "8382",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "0375",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "3326",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "0905",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "7952",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "B0D0",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 70
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 70
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 70
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 70
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 70
        }
      ]
    },
    {
      "ridCode": "9400",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "1143",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 88
        }
      ]
    },
    {
      "ridCode": "2041",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "B045",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 88
        }
      ]
    },
    {
      "ridCode": "5543",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "2175",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "2597",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "A7L6",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "1936",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "5479",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "2082",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "0373",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "B385",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "B2E6",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 86
        }
      ]
    },
    {
      "ridCode": "B4F3",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "2753",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "6886",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 126
        }
      ]
    },
    {
      "ridCode": "3072",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "6245",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 87
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 104
        }
      ]
    },
    {
      "ridCode": "1827",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "8386",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "B625",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "A0X1",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 72
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 72
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 72
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 71
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 72
        }
      ]
    },
    {
      "ridCode": "B096",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "B4A3",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "7573",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "1743",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 100
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 85
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 100
        }
      ]
    },
    {
      "ridCode": "2730",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "1803",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    },
    {
      "ridCode": "1402",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "8413",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "7848",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 124
        }
      ]
    },
    {
      "ridCode": "2799",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 124
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 97
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 124
        }
      ]
    },
    {
      "ridCode": "0923",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "0635",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 98
        }
      ]
    },
    {
      "ridCode": "6988",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 132
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 132
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 132
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 101
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 132
        }
      ]
    },
    {
      "ridCode": "A5H4",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 79
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 88
        }
      ]
    },
    {
      "ridCode": "B2U6",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 86
        }
      ]
    },
    {
      "ridCode": "9880",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "3211",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 84
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 77
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 84
        }
      ]
    },
    {
      "ridCode": "0694",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 108
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 89
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 108
        }
      ]
    },
    {
      "ridCode": "9733",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "0934",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 102
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 86
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 102
        }
      ]
    },
    {
      "ridCode": "6188",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "7308",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 106
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 88
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 106
        }
      ]
    },
    {
      "ridCode": "0380",
      "offers": [
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 81
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 92
        }
      ]
    },
    {
      "ridCode": "8426",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 110
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 90
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 110
        }
      ]
    },
    {
      "ridCode": "0751",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 83
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 96
        }
      ]
    },
    {
      "ridCode": "1979",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 122
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 96
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 122
        }
      ]
    },
    {
      "ridCode": "0697",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 114
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 92
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 114
        }
      ]
    },
    {
      "ridCode": "B0E4",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 78
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 74
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 78
        }
      ]
    },
    {
      "ridCode": "9293",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 116
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 93
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 116
        }
      ]
    },
    {
      "ridCode": "5010",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 76
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 82
        }
      ]
    },
    {
      "ridCode": "8364",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 112
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 91
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 112
        }
      ]
    },
    {
      "ridCode": "4987",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 126
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 98
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 126
        }
      ]
    },
    {
      "ridCode": "8989",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 104
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 138
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 104
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 138
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 104
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 138
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 104
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 138
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 104
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 138
        }
      ]
    },
    {
      "ridCode": "3589",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 120
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 95
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 120
        }
      ]
    },
    {
      "ridCode": "0903",
      "offers": [
        {
          "date": "11/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "11/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "12/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "12/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "13/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "13/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "14/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "14/01/2021",
          "fare": "STANDARD",
          "price": 94
        },
        {
          "date": "15/01/2021",
          "fare": "SPECIAL_OFFER",
          "price": 82
        },
        {
          "date": "15/01/2021",
          "fare": "STANDARD",
          "price": 94
        }
      ]
    }
  ]
}
},{}],5:[function(require,module,exports){
const distance = (lat1, lon1, lat2, lon2) => {
	const R = 6371e3; // metres
	const φ1 = lat1 * Math.PI/180; // φ, λ in radians
	const φ2 = lat2 * Math.PI/180;
	const Δφ = (lat2-lat1) * Math.PI/180;
	const Δλ = (lon2-lon1) * Math.PI/180;

	const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			  Math.cos(φ1) * Math.cos(φ2) *
			  Math.sin(Δλ/2) * Math.sin(Δλ/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	const d = R * c; // in metres
	
	return d;
}

module.exports = {
	distance: distance
}
},{}],6:[function(require,module,exports){
const HOTELS = require('./data/hotels.json').hotels;

const getHotels = () => {
	return HOTELS;
}

module.exports = {
	getHotels: getHotels
}
},{"./data/hotels.json":3}],7:[function(require,module,exports){
const PRICES = require('./data/prices.json').prices;

const getPrices = () => {
	return PRICES;
}

module.exports = {
	getPrices: getPrices
}
},{"./data/prices.json":4}]},{},[2]);
