

const Banner = () => {
  return (
    <div className="flex h-full w-1/2 flex-col items-center justify-center bg-customBlue">
    <div>
      <h1 className="text-3xl lg:text-6xl font-bold text-primary-foreground no-underline">
        Wakacyjny<span className="text-customYellow">Last</span>
      </h1>
      <h3 className="text-xl text-primary-foreground mt-2">
        Złap swojego lasta,
        <br />
        codzienne okazje dla każdego!
      </h3>
    </div>
  </div>
  )
}

export default Banner