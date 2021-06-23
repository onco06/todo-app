import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
const ary1 = [
  {
    id: 1,
    name: "apple"
  },
  {
    id: 2,
    name: "banana"
  },
  {
    id: 3,
    name: "grape"
  }
];

const obj = {
  id: 2,
  name: "peach"
};

ary1.map((fruet) => {
  {
    fruet.id === obj.id ? (fruet.name = obj.name) : console.log(fruet.name);
  }
});
console.log(ary1);
