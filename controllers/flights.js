const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
    new: newFlight,
    create,
    index,
    show,
    addDest,
    newTicket,
    buyTicket
}

function show(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        Ticket.find({ flight: flight._id }, function (err, tickets) {
            res.render('flights/show', {
                title: 'Flight Details',
                flight,
                tickets
            })
        })
    })

}

function index(req, res) {
    Flight.find({}, function (err, flightData) {
        res.render('flights/index', {
            title: 'Flights',
            flights: flightData
        })
    })

}

function newFlight(req, res) {
    res.render('flights/new', { title: 'Add A Flight'});
}

function create(req, res) {
    req.body.flightNo = Number(req.body.flightNo)
    req.body.departs = new Date(req.body.departs)


    Flight.create(req.body, function (err, createData) {
        if (err) {
            console.log(err)
            return res.redirect('/flights/new')
        }

        res.redirect('/flights')
    })



}

function addDest(req, res) {
    req.body.arrival = new Date(req.body.arrival)

    Flight.findById(req.params.id, function (err, flightData) {
        console.log(flightData)
        flightData.destinations.push(req.body)
        flightData.save(function (err) {
            res.redirect(`/flights/${req.params.id}`)
        })
    })

}

function newTicket(req, res) {
    // console.log(req.params.id)
    let price = Math.floor(Math.random()*50)+200

    Flight.findById(req.params.id, function (err, flight) {
        Ticket.find({ flight: flight._id }, function (err, tickets) {
            let takenSeats = []
            tickets.forEach(t => takenSeats.push(t.seat))
            // console.log(takenSeats)
            res.render('flights/tickets/new', {
                title: 'Purchase A Ticket',
                flight,
                tickets,
                takenSeats,
                price
            })
        })
    })
}

function buyTicket(req, res) {
    console.log(req.body)
    Ticket.findOne({ seat: req.body.seat, flight: req.params.id }, function (err, check) {
        if (!(!!check)) {
            req.body['flight'] = req.params.id
            Ticket.create(req.body, function (err, ticket) {
                // console.log(ticket)
                res.redirect(`/flights/${req.params.id}/tickets`)

            })
        } else {
            res.redirect(`/flights/${req.params.id}/tickets`)
        }
    })

}