import NavBar from "../components/Navbar";

export default function Producto1() {
  return (
    <div>
      <NavBar />
      <div className="my-25 w-[96dvw] flex flex-row items-start justify-center">
        <section className="w-[60dvw]">
          <img
            src="../pulsera2.png"
            alt="producto2"
            className="w-[50dvw] h-auto"
          />
        </section>
        <aside className="w-[30dvw] flex flex-col item-center gap-10 py-16">
          <div className="flex flex-col items-start gap-10 justify-center">
            <h1 className="font-bold text-2xl">Pulsera roja y blanca</h1>
            <p>
              Pulseras de perlas hechas a mano. El mejor accesorio para tu mejor
              conjunto de noche de verano.
            </p>
            <p>
              No te olvides de especificar la pulsera que más te guste en la
              sección de pago.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-[1px] bg-black/40"></div>
            <a href="https://buy.stripe.com/4gMfZhabl3b71c4eC9gw002">
              <button className="cursor-pointer w-full border py-2 rounded-full font-bold tracking-tighter bg-black text-white">
                Pagar
              </button>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
