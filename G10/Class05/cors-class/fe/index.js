const getUsers = async () => {
  const result = await fetch("http://localhost:3000/users", { method: "PUT" });

  const data = await result.json();

  console.log(data);
};
getUsers();
