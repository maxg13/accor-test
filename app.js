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
