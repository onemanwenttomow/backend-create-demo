import useSWR from "swr";

export default function JokeForm() {
  const { mutate } = useSWR("/api/jokes");
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("sanity?");

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    console.log("jokeData: ", jokeData);
    // Goal after break is to make a POST request
    const response = await fetch("/api/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData),
    });

    console.log("response.ok: ", response.ok);
    if (response.ok) {
      mutate();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke-input">Enter a new joke</label>
      <input type="text" id="joke-input" name="joke" />
      <button type="submit">Submit</button>
    </form>
  );
}
