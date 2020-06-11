import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { makeStyles } from "@material-ui/styles";

//JSON data
const searchResult = {
  search: "gaming",
  shopAndProduct: [
    {
      shop: {
        products: [
          "5ecbbf07b58e22c5a3bc146a",
          "5ecbbe60ef18cac0bbb7f9f6",
          "5ecbbe52ef18cac0bbb7f9f5",
          "5ecbbe46ef18cac0bbb7f9f4",
          "5ecbbe38ef18cac0bbb7f9f3",
          "5ecbbdd9ef18cac0bbb7f9f2",
          "5ecbbd6eef18cac0bbb7f9f1",
          "5ecbbd60ef18cac0bbb7f9f0",
          "5ecbbd50ef18cac0bbb7f9ef",
          "5ecbbd2eef18cac0bbb7f9ee",
          "5ecbbd14ef18cac0bbb7f9ec",
        ],
        reviews: [
          "5ecd267e81b187159fe0b0f6",
          "5ecd25338fe2a21532dd7025",
          "5ecd23efa6476d14f29d275e",
        ],
        _id: "5ecbba6d0d3ff0339065ce27",
        owner: "5ecbb976c2d4edbf23ea3a92",
        __v: 14,
        address: "629 Aljunied Rd, #04-02A, Singapore 389838",
        latLng: {
          lat: 1.365239,
          lng: 103.814274,
        },
        avatar:
          "https://i.pcmag.com/imagery/articles/05pGSLeBVTWQNoDPNG2midy-4.fit_scale.size_2698x1517.v1573262409.jpg",
        description:
          "Welcome I am a super cool gaming shop that sells gaming sets, equipments and accessories to spice up your gaming life",
        ratings: 5.694444444444444,
      },
      product: {
        _id: "5ecbbd50ef18cac0bbb7f9ef",
        shop: "5ecbba6d0d3ff0339065ce27",
        name: "Hasbro Gaming Trivial Pursuit Game: Classic Edition",
        description:
          "Gather your friends to play the trivia game that started It all! The Classic Edition of this Trivial Pursuit Game is the same gameplay you know and love, only with a 1980's retro appearance! Featuring classic gameplay and gameboard, this game contains 2,400 questions in 6 categories: Geography, Entertainment, History, Art and Literature, Science and Nature, and Sports and Leisure. Players move around the board answering questions. When a player lands on a category space, they'll earn the corresponding colored wedge if they answer the question correctly. The first player to collect 6 different colored wedges and answer a final question correctly wins! Trivial Pursuit, the associated logo, the distinctive design of the gameboard, trivia cards, game tokens, and scoring wedges are trademarks of Hasbro. Hasbro Gaming and all related terms are trademarks of Hasbro.",
        price: 110.18,
      },
    },
    {
      shop: {
        products: [
          "5ecbbf07b58e22c5a3bc146a",
          "5ecbbe60ef18cac0bbb7f9f6",
          "5ecbbe52ef18cac0bbb7f9f5",
          "5ecbbe46ef18cac0bbb7f9f4",
          "5ecbbe38ef18cac0bbb7f9f3",
          "5ecbbdd9ef18cac0bbb7f9f2",
          "5ecbbd6eef18cac0bbb7f9f1",
          "5ecbbd60ef18cac0bbb7f9f0",
          "5ecbbd50ef18cac0bbb7f9ef",
          "5ecbbd2eef18cac0bbb7f9ee",
          "5ecbbd14ef18cac0bbb7f9ec",
        ],
        reviews: [
          "5ecd267e81b187159fe0b0f6",
          "5ecd25338fe2a21532dd7025",
          "5ecd23efa6476d14f29d275e",
        ],
        _id: "5ecbba6d0d3ff0339065ce27",
        owner: "5ecbb976c2d4edbf23ea3a92",
        __v: 14,
        address:
          "Tampines Central 5, #04-10/11 Tampines Mall, Singapore 529510",
        latLng: {
          lat: 1.343101,
          lng: 103.852039,
        },
        avatar:
          "https://i.pcmag.com/imagery/articles/05pGSLeBVTWQNoDPNG2midy-4.fit_scale.size_2698x1517.v1573262409.jpg",
        description:
          "Welcome I am a super cool gaming shop that sells gaming sets, equipments and accessories to spice up your gaming life",
        ratings: 5.694444444444444,
      },
      product: {
        _id: "5ecbbd2eef18cac0bbb7f9ee",
        shop: "5ecbba6d0d3ff0339065ce27",
        name: "Razer Seiren X USB Gaming Microphone",
        description:
          "Condenser microphone made for streaming. Supercardioid pick-up pattern to reduce background noise. Built-in shock mount to dampen vibrations. Mute button. Zero-latency 3.5 mm headphone monitoring port.",
        price: 159,
      },
    },
    {
      shop: {
        products: [
          "5ecbbf07b58e22c5a3bc146a",
          "5ecbbe60ef18cac0bbb7f9f6",
          "5ecbbe52ef18cac0bbb7f9f5",
          "5ecbbe46ef18cac0bbb7f9f4",
          "5ecbbe38ef18cac0bbb7f9f3",
          "5ecbbdd9ef18cac0bbb7f9f2",
          "5ecbbd6eef18cac0bbb7f9f1",
          "5ecbbd60ef18cac0bbb7f9f0",
          "5ecbbd50ef18cac0bbb7f9ef",
          "5ecbbd2eef18cac0bbb7f9ee",
          "5ecbbd14ef18cac0bbb7f9ec",
        ],
        reviews: [
          "5ecd267e81b187159fe0b0f6",
          "5ecd25338fe2a21532dd7025",
          "5ecd23efa6476d14f29d275e",
        ],
        _id: "5ecbba6d0d3ff0339065ce27",
        owner: "5ecbb976c2d4edbf23ea3a92",
        __v: 14,
        address: "200 Victoria St, 03 24B, Singapore 188021",
        latLng: {
          lat: 1.330573,
          lng: 103.76252,
        },
        avatar:
          "https://i.pcmag.com/imagery/articles/05pGSLeBVTWQNoDPNG2midy-4.fit_scale.size_2698x1517.v1573262409.jpg",
        description:
          "Welcome I am a super cool gaming shop that sells gaming sets, equipments and accessories to spice up your gaming life",
        ratings: 5.694444444444444,
      },
      product: {
        _id: "5ecbbdd9ef18cac0bbb7f9f2",
        shop: "5ecbba6d0d3ff0339065ce27",
        name:
          "Hasbro Gaming Candy Land Kingdom Of Sweet Adventures Board Game For Kids Ages 3 & Up Candyland",
        description:
          "Once upon a time, King Kandy,the Imperial Head Bonbon and Grand Jujube of Candy Land disappeared.Thus begins the magical journey of Milton Bradley's classic Candy Land board game. Captivated by the story of a kidnapped king and eager to help find him, little ones move their gingerbread pawns along a rainbow path and through a land of candy characters, all subjects of King Kandy's realm.",
        price: 48.9,
      },
    },
    {
      shop: {
        products: [
          "5ecbbf07b58e22c5a3bc146a",
          "5ecbbe60ef18cac0bbb7f9f6",
          "5ecbbe52ef18cac0bbb7f9f5",
          "5ecbbe46ef18cac0bbb7f9f4",
          "5ecbbe38ef18cac0bbb7f9f3",
          "5ecbbdd9ef18cac0bbb7f9f2",
          "5ecbbd6eef18cac0bbb7f9f1",
          "5ecbbd60ef18cac0bbb7f9f0",
          "5ecbbd50ef18cac0bbb7f9ef",
          "5ecbbd2eef18cac0bbb7f9ee",
          "5ecbbd14ef18cac0bbb7f9ec",
        ],
        reviews: [
          "5ecd267e81b187159fe0b0f6",
          "5ecd25338fe2a21532dd7025",
          "5ecd23efa6476d14f29d275e",
        ],
        _id: "5ecbba6d0d3ff0339065ce27",
        owner: "5ecbb976c2d4edbf23ea3a92",
        __v: 14,
        address: "Blk, 720 Ang Mo Kio Ave 6, #01-4112, 560720",
        latLng: {
          lat: 1.335035,
          lng: 103.787495,
        },
        avatar:
          "https://i.pcmag.com/imagery/articles/05pGSLeBVTWQNoDPNG2midy-4.fit_scale.size_2698x1517.v1573262409.jpg",
        description:
          "Welcome I am a super cool gaming shop that sells gaming sets, equipments and accessories to spice up your gaming life",
        ratings: 5.694444444444444,
      },
      product: {
        _id: "5ecbbd60ef18cac0bbb7f9f0",
        shop: "5ecbba6d0d3ff0339065ce27",
        name:
          "XIAOMI 23.8-Inch Office Gaming Monitor IPS Technology Hard Screen 178° Super Wide Viewing Angle 1080P High-Definition Picture Quality Multi-Interface Display",
        description:
          "Product model: XMMNT238CB. Machine power: 24W Max.. Visual size (diagonal): 60.5cm. Brightness: 250 nit. Color: 16.7M. Response time: 6ms (GTG). Recommended resolution: 1920×1080. Product net weight: 4.2kg. Working humidity: 10% RH-90% RH. Atmospheric pressure: 86kPa-106kPa. Machine size: 538.7 (L) × 180 (W) × 418.7 (H) mm.",
        price: 159,
      },
    },
  ],
};

//JSON data specific to shop and product
const shopAndProduct = searchResult.shopAndProduct;

function createKey(location) {
  return location.lat + location.lng;
}

const useStyles = makeStyles((theme) => ({
  infoWindow: {
    width: "30px",
    height: "40px",
  },
}));

const libraries = ["places"];
const mapContainerStyles = {
  height: "100%",
};
const center = {
  lat: 1.3521,
  lng: 103.8198,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
// const directionsService = new window.google.maps.DirectionsService();
export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [selected, setSelected] = useState(null);

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };
  const classes = useStyles();
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyles}
      zoom={12}
      center={center}
      options={options}
    >
      {shopAndProduct.map((product) => {
        return (
          <Marker
            key={createKey(product.shop.latLng)}
            position={product.shop.latLng}
            onClick={() => {
              setSelected(product);
            }}
          />
        );
      })}
      {selected ? (
        <InfoWindow
          position={selected.shop.latLng}
          onCloseClick={() => {
            setSelected(null);
          }}
          className={classes.infoWindow}
        >
          <div>
            <h4>{selected.product.name}</h4>
            <h4>{"$ " + selected.product.price}</h4>
            <h4>{selected.shop.address}</h4>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}
