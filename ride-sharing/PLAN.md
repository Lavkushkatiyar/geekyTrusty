# things to done

1. parser
   - it will parse the request or input
   - keeps the driver separate
   -

## format

input -

```js
ADD_DRIVER D1 1 1
ADD_DRIVER D2 4 5
ADD_DRIVER D3 2 2
ADD_RIDER R1 0 0
MATCH R1
START_RIDE RIDE-001 2 R1
STOP_RIDE RIDE-001 4 5 32
BILL RIDE-001
```

structure i need

```js
 Drivers {
DriverId {<X_COORDINATE> <Y_COORDINATE>}
}
RIDERS {
  RIDER_ID { <X_COORDINATE> <Y_COORDINATE>}
}
MATCH {
 <RIDER_ID>
}
START_RIDE{
  <RIDE_ID> <N> <RIDER_ID>

}
STOP_RIDE{
<RIDE_ID> <DESTINATION_X_COORDINATE> <DESTINATION_Y_COORDINATE> <TIME_TAKEN_IN_MIN>
}

BILL{
<RIDE_ID>
}
```
