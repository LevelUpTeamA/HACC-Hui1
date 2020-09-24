import React from 'react';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header } from 'semantic-ui-react';
import { InterestedDevs } from '../../../api/team/InterestedDevCollection';
import { Developers } from '../../../api/user/DeveloperCollection';
import { DeveloperChallenges } from '../../../api/user/DeveloperChallengeCollection';
import { DeveloperSkills } from '../../../api/user/DeveloperSkillCollection';
import { DeveloperTools } from '../../../api/user/DeveloperToolCollection';
import InterestedDeveloperExampleWidget from './InterestedDeveloperExampleWidget';
import { TeamChallenges } from '../../../api/team/TeamChallengeCollection';
import { Challenges } from '../../../api/challenge/ChallengeCollection';
import { TeamSkills } from '../../../api/team/TeamSkillCollection';
import { Skills } from '../../../api/skill/SkillCollection';
import { TeamTools } from '../../../api/team/TeamToolCollection';
import { Teams } from '../../../api/team/TeamCollection';
import { Tools } from '../../../api/tool/ToolCollection'

const getDeveloperChallenges = (dev) => {
  const teamID = dev._id;
  const devChallengeDocs = DeveloperChallenges.find({ teamID }).fetch();
  const challengeTitles = devChallengeDocs.map((tc) => Challenges.findDoc(tc.challengeID).title);
  return challengeTitles;
};

const getDeveloperSkills = (team) => {
  const teamID = team._id;
  const developerSkills = DeveloperSkills.find({ teamID }).fetch();
  const skillNames = developerSkills.map((ts) => Skills.findDoc(ts.skillID).name);
  return skillNames;
};

const getDeveloperTools = (team) => {
  const teamID = team._id;
  const developerTools = DeveloperTools.find({ teamID }).fetch();
  const toolNames = developerTools.map((tt) => Tools.findDoc(tt.toolID).name);
  return toolNames;
};

class InterestedDevelopersWidget extends React.Component {
  render() {
    return (
        <Grid celled>
          <Grid.Row columns={5}>
            <Grid.Column>
              <Header>Name</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Slack Username</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Challenges</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Skills</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Tools</Header>
            </Grid.Column>
          </Grid.Row>
          {this.props.developers.map((dev) => (
              <InterestedDeveloperExampleWidget key={dev._id}
                                                developers={dev}
                                                challenges={getDeveloperChallenges(dev)}
                                                skills={getDeveloperSkills(dev)}
                                                tools={getDeveloperTools(dev)}
              />
          ))}
        </Grid>
    );
  }
}

InterestedDevelopersWidget.propTypes = {
  developerChallenges: PropTypes.array.isRequired,
  interestedDevs: PropTypes.array.isRequired,
  developerSkills: PropTypes.array.isRequired,
  skills: PropTypes.array.isRequired,
  developerTools: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  developers: PropTypes.array.isRequired,
  tools: PropTypes.array.isRequired,
};

export default withTracker(() => {
  return {
    developers: Developers.find({}).fetch(),
    developerChallenges: DeveloperChallenges.find({}).fetch(),
    developerSkills: DeveloperSkills.find({}).fetch(),
    developerTools: DeveloperTools.find({}).fetch(),
    interestedDevs: InterestedDevs.find({}).fetch(),
    skills: Skills.find({}).fetch(),
    challenges: Challenges.find({}).fetch(),
    tools: Tools.find({}).fetch(),
  };
})(InterestedDevelopersWidget);
