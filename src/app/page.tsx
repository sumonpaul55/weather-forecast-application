
import GetCities from "@/actions/cities/cities";
import DisplayCities from "@/components/homepage/DisplayCities";
import React from "react";


const Home = async () => {
  const cities: any = await GetCities();
  // console.log(city)
  return (
    <main className="min-h-screen bg-sky-700 pt-1 herosection">
      <DisplayCities cities={cities.results} />
    </main>
  )
}

export default Home;