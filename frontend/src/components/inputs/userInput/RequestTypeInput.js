const RequestTypeInput = () => {
  return (
    <div className="form-group">
      <label htmlFor="requestType">
        Quote
        <input type="radio" name="requestType" id="quote" value="quote" />
      </label>
      <label htmlFor="requestType">
        Pricing
        <input type="radio" name="requestType" id="pricing" value="pricing" />
      </label>
      <label htmlFor="requestType">
        Technical Information
        <input
          type="radio"
          name="requestType"
          id="technicalInformation"
          value="technicalInformation"
        />
      </label>
    </div>
  );
};

export default RequestTypeInput;
