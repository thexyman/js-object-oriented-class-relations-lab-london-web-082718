
let store = {drivers: [], passengers: [], trips: []}
let tripId = 0
let driverId = 0
let passengerId = 0

// has_many trip 
// has_many passengers through trips 
class Driver {

    constructor(name) {
        this.id = ++driverId
        this.name = name 

        store.drivers.push(this)
    }


    trips () {
        return store.trips.filter(trip => {
            return trip.driverId === this.id 
        })
    }

    passengers () {
        return this.trips().map(trip => {
            return trip.passenger()
        })
    }

}


// belongs_to driver 
// belongs_to passenger 
class Trip {

    constructor(driver, passenger) {
        this.id = ++tripId
        if (driver) {
            this.driverId = driver.id; 
        }
        if (passenger) {
            this.passengerId = passenger.id
        }
        store.trips.push(this)
    }


    driver() {
        return store.drivers.find(driver => {
          return driver.id === this.driverId;
        });
      }
    
    passenger() {
    return store.passengers.find(passenger => {
        return passenger.id === this.passengerId;
    });
    }

}


// has_many trips 
// has_many drivers through trips 
class Passenger {

    constructor(name) {
        this.id = ++passengerId 
        this.name = name 

        store.passengers.push(this)
    }

    trips () {
        return store.trips.filter(trip => {
            return trip.passengerId === this.id 
        })
    }

    drivers () {
        return this.trips().map(trip => {
            return trip.driver()
        })
    }

}



let alan = new Driver('Alan') 
let bob = new Driver('Bob')

let ali = new Passenger('Ali')
let steve = new Passenger('Steve')

let trip = new Trip(alan, ali)

store;