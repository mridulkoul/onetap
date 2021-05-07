const signin = () => {
    const handleCredentialResponse = (response: any) => {
      const credential = response.credential;
      const getDetails = async () => {
        const params = new window.URLSearchParams({ credential });
        const url = `${process.env.REACT_APP_API_BASE_URL}/google?${params}`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        setLoggedIn(true);
        setState({ ...state, participant: data.participant });
      };
      getDetails();
    };
    if (state && state.participant && state.participant.id) {
      setLoggedIn(true);
    } else {
      const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const callback = handleCredentialResponse;
      const auto_select = false;
      const cancel_on_tap_outside = false;
      google.accounts.id.initialize({ client_id, callback, auto_select, cancel_on_tap_outside });
      google.accounts.id.prompt((notification: any) => {
        console.log(notification); // rl {g: "display", h: false, j: "suppressed_by_user"}
        console.log(notification.getNotDisplayedReason()); // suppressed_by_user
      });
    }
  };