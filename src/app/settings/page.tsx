'use'
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";
// import {Button} from "@nextui-org/button";
// import IsAuth from "@/components/IsAuth";

const Settings = () => {
  return (
    <div className="flex flex-1 p-0 justify-center pt-24">
      
      <CheckboxGroup
        label="Visible columns"
        defaultValue={["buenos-aires", "london"]}
      >
        <Checkbox value="project">Project</Checkbox>
        <Checkbox value="name">Name</Checkbox>
        <Checkbox value="startDate">Start Date</Checkbox>
        <Checkbox value="endDate">End Date</Checkbox>
        <Checkbox value="status">Status</Checkbox>
        <Checkbox value="startDate">Start Date</Checkbox>
        <Checkbox value="duration">Duration</Checkbox>
      </CheckboxGroup>
      {/* <div className="flex flex-row flex-1">
        <Button>
          Save
        </Button>
      </div> */}
    </div>
  )
}

export default Settings