export const addClient = (data) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/adventurus/admin/addclient?city=${data.city}&clientName=${data.clientName}&emailAddress=${data.emailAddress}&imageUrl=${data.imageUrl}&password=${data.password}&phone=${data.phone}&state=${data.state}&userName=${data.userName}&website=${data.website}`, {
      method: "post",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };





