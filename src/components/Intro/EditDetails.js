import React, { useRef } from "react";
import useClickOutside from "../../helpers/clickOutside";
import Detail from "./Detail";

function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) {
  const modal = useRef(null);

  useClickOutside(modal, () => {
    setVisible(false);
  });

  return (
    <div className="blur">
      <div className="postBox infosBox" ref={modal}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>

        <div className="details_wrapper">
          <div className="details_col">
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className="details_header">Other name</div>
          <Detail
            value={details?.otherName}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="other name"
          />

          <div className="details_header">Work</div>
          <Detail
            value={details?.job}
            img="job"
            placeholder="Add job title"
            name="job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a job"
          />
          <Detail
            value={details?.workplace}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="workplace"
          />

          <div className="details_header">Education</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add your high school"
            name="highSchool"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a highschool"
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add your college"
            name="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="college"
          />

          <div className="details_header">Current City</div>
          <Detail
            value={details?.currentCity}
            img="studies"
            placeholder="Add a current city"
            name="currentCity"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="a current city"
          />

          <div className="details_header">Hometown</div>
          <Detail
            value={details?.hometown}
            img="studies"
            placeholder="Add your hometown"
            name="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your hometown"
          />

          <div className="details_header">Relationship</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            placeholder="Add your relationship"
            name="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your relationship"
            rel
          />

          <div className="details_header">Instagram</div>
          <Detail
            value={details?.instagram}
            img="studies"
            placeholder="Add your instagram"
            name="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="your instagram"
          />
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
