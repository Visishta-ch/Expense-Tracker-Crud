document
  .getElementById('my-form')
  .addEventListener('submit', async function submit(e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const user = {
      amount,
      description,
      category,
    };

    const response = await axios.post(
      `https://crudcrud.com/api/66c6b068f02c41c1811c355d369f83e9/etLog`,
      user
    );

    if (response.status === 201) {
      console.log(response.data);
      displayUserLog(response.data);

      document.getElementById('my-form').reset();
      document.getElementById('amount').focus();
    } else {
      alert(`Error in saving data`);
    }
  });

window.onload = async function () {
  const response = await axios.get(
    `https://crudcrud.com/api/66c6b068f02c41c1811c355d369f83e9/etLog`
  );
  try {
    for (var i = 0; i < response.data.length; i++) {
      displayUserLog(response.data[i]);
    }
  } catch (err) {
    console.log(`Oops something went wrong `);
  }
};

function displayUserLog(user) {
  document.getElementById('amount').value.trim();
  document.getElementById('description').value.trim();

  const parentNode = document.getElementById('items');
  const childHTML = `<li id=${user._id}> ${user.amount} - ${user.description} - ${user.category}
                            <button onclick=deleteExistingUser('${user._id}')> Delete User </button> 
                            <button onclick=editUserDetails('${user.amount}','${user.description}','${user._id}')> Edit User </button>
                         </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editUserDetails(amount, description, user_id) {
  document.getElementById('amount').value = amount;
  document.getElementById('description').value = description;
  deleteExistingUser(user_id);
}

async function deleteExistingUser(user_id) {
  const reqId = await axios.delete(
    `https://crudcrud.com/api/66c6b068f02c41c1811c355d369f83e9/etLog/${user_id}`
  );

  deleteUser(user_id);
}

function deleteUser(id) {
  const parentNode = document.getElementById('items');
  const childNodeToBeDeleted = document.getElementById(id);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
