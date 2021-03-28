import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

const LocationCard = ({ img, name, description }) => {
  return (
    <Card className="location-card">
      <CardMedia image={img} className="location-image" title={name} />

      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </CardContent>
    </Card>
  );
};

const LocationListPanel = () => {
  const locations = [
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
    {
      img:
        "https://s3-media0.fl.yelpcdn.com/bphoto/b_sq8nM-Kum8yV79S_FvCw/348s.jpg",
      name: "Cellar Restaurant",
      description: "Accessible Friendly",
    },
  ];

  const locationsDisplay = locations.map((loc) => (
    <LocationCard {...loc} key={loc.name} />
  ));

  return <div className="locations-list">{locationsDisplay}</div>;
};

export default LocationListPanel;
