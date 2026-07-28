export default function Hero() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-20">
      <h1 className="text-center text-5xl font-bold tracking-tight">
        Smart <span className="text-blue-600">Visitor & Gate Pass</span> <br />{" "}
        Management
      </h1>
      <p className="mt-4 max-w-3xl text-center text-xl">
        Digitally manage visitors, employee gate passes, security logs, and
        office access from one centralized, high-fidelity platform.
      </p>
      <div className="mt-4">
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Get Started
        </button>
      </div>
    </div>
  );
}
