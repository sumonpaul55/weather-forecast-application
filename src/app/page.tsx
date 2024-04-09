
import GetCities from "@/actions/cities/cities";
import DisplayCities from "@/components/homepage/DisplayCities";
import React from "react";


const Home = async () => {
  const cities: any = await GetCities();
  // console.log(city)
  return (
    <main className="min-h-screen pt-1 herosection">
      <DisplayCities cities={cities.results} />
    </main>
  )
}

export default Home;