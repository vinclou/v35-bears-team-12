/**
 * TODO:
 * 	1) fetching team data from database
 *  2) mobile design for the project card
 *  3) make it expand on action click
 *  4) fetch real keywords from database
 *  5) pagination in index page by 8 projects per page
 */
import React from "react";
// format is kinda ads a huge chunk of js on load, maybe use native date api
import { format } from "date-fns";
// import { Avatar } from "../../components/avatar";
import {
  Avatar,
  Box,
  Badge,
  Button,
  Heading,
  SimpleGrid,
  GridItem,
  VStack,
  HStack,
  Text,
  useBoolean,
} from "@chakra-ui/react";

import { SocialLink } from "../styled-link/social-link";
import { useColorModeSwitcher } from "../../hooks/useColorModeSwitcher";
import { github, discord } from "../../content/socials";
import Image from "next/image";
import logo from "../../public/misc-projectLogo.png";

// async function getTeam() {
//   const team = await axios.get("/api/team");
//   return team.data;
// }

// TODO: fetch project team name from database
const ProjectCard = ({ isMobile, project }) => {
  // temp static data
  // const keywords = {
  //   data: ["js", "django", "react", "nextjs", "figma"],
  // };
  // const [teamData, setTeamData] = useState();
  const [isExpanded, setExpanded] = useBoolean();
  const { colorGrey, secondaryThemed } = useColorModeSwitcher();

  const {
    id,
    createdAt,
    updatedAt,
    projectName,
    catchPhrase,
    description,
    startDate,
    positionTitles,
    timeZone,
    githubLink,
    discordId,
    isChinguVoyage,
    teamId,
    keywords,
    team,
  } = project;

  if (isMobile) {
    return (
      <MobileProjectCard
        isMobile={isMobile}
        logo={logo}
        discordId={discordId}
        githubLink={githubLink}
        projectName={projectName}
        teamName={team.teamName}
        keywords={keywords}
      />
    );
  }

  return (
    <VStack
      as="section"
      w={{ base: "100%", md: "90%", lg: "80%" }}
      p={{ base: "0.5rem", "2xl": "0.2rem" }}
      mx={{ base: "0rem", md: "auto", "2xl": "auto" }}
      spacing="0rem"
      mb="2rem"
    >
      <HStack
        spacing="1rem"
        w={{
          base: "360px",
          sm: "620px",
          md: "680px",
          lg: "780px",
          xl: "880px",
        }}
        h={{
          base: "200px",
        }}
        mb="0.1rem"
        p={{ base: "1rem", "2xl": "2rem" }}
        bgColor="accent.simpleWhite"
        boxShadow="lg"
        // borderColor={colorGrey}
        borderLeftColor="secondary.600"
        borderBottomColor="complimentary.300"
        borderRadius="4px"
        borderLeftWidth={3}
        borderBottomWidth={3}
        onClick={setExpanded.toggle}
      >
        <ProjectCardLeftElement
          logo={logo}
          discordId={discordId}
          githubLink={githubLink}
        />

        <ProjectCardCenterElement
          logo={logo}
          projectName={projectName}
          teamName={team.teamName}
          keywords={keywords}
        />

        <ProjectCardRightElement
          description={description}
          setExpanded={setExpanded}
        />
      </HStack>

      <ExpandableWrapper
        // borderColor={colorGrey}
        boxShadow="lg"
        bgColor="accent.simpleWhite"
        borderColor="primary.600"
        borderRadius="4px"
        borderBottomWidth={3}
        data={team}
        isVisible={isExpanded}
      >
        {/* Put Others into a Grid*/}
        <SimpleGrid
          as="section"
          columns={{ base: 1, md: 2 }}
          //w="inherit"
          p={{ base: "1rem", "2xl": "2rem" }}
          gap="0.5rem"
        >
          <GridItem as="section" aria-label="team name" p="0.5rem">
            <TextWithLabel labelText="Team Name" bodyText={team.teamName} />
          </GridItem>

          <GridItem p="0.5rem">
            <HStack justifyContent="space-between">
              <TextWithLabel
                labelText="Apply Before"
                bodyText={format(new Date(startDate), "MMM d y")}
              />
              <TextWithLabel labelText="Timezone" bodyText={timeZone} />
            </HStack>
          </GridItem>

          <GridItem p="0.5rem">
            <TextWithLabel
              labelText="Team Description"
              bodyText={team.description}
            />
          </GridItem>

          <GridItem p="0.5rem">
            <TextWithLabel labelText="We Are Building" bodyText={catchPhrase} />
          </GridItem>

          <GridItem p="0.5rem">
            <Text variant="gentleTitle" children="Team" />
            <AvatarStack avatarArray={team.members} />
          </GridItem>

          <GridItem p="0.5rem">
            <TextWithLabel
              labelText="Ways To Reach Us Out"
              bodyText="Discord"
            />
          </GridItem>
        </SimpleGrid>

        {/* Main Project Description */}
        <Box w="inherit" p={{ base: "1.5rem", "2xl": "2rem" }}>
          <TextWithLabel
            labelText="Project Description"
            bodyText={description}
          />
        </Box>
      </ExpandableWrapper>
    </VStack>
  );
};

const MobileProjectCard = ({
  isMobile,
  logo,
  discordId,
  githubLink,
  projectName,
  teamName,
  keywords,
}) => {
  // TODO: wrap it inside a link to the project page
  return (
    <Box
      as="section"
      w={{
        base: "360px",
        sm: "380px",
      }}
      boxShadow="lg"
      bgColor="accent.simpleWhite"
      borderLeftColor="secondary.600"
      borderBottomColor="complimentary.300"
      borderRadius="4px"
      borderLeftWidth={3}
      borderBottomWidth={3}
      mx="auto"
      mb="1.3rem"
    >
      <HStack spacing="1rem" w="inherit" p={{ base: "1rem", "2xl": "2rem" }}>
        <ProjectCardLeftElement
          logo={logo}
          discordId={discordId}
          githubLink={githubLink}
        />

        <ProjectCardCenterElement
          isMobile={isMobile}
          logo={logo}
          projectName={projectName}
          teamName={teamName}
          keywords={keywords}
        />
      </HStack>
    </Box>
  );
};

const AvatarStack = ({ avatarArray }) => {
  // TODO: wrap avatar in a link to profile page
  return (
    <HStack p="0.2rem" spacing="0.5rem" alignItems="center">
      {avatarArray.map((avatar) => (
        <VStack key={avatar.name}>
          <Avatar name={avatar.name} src={avatar.image} size="sm" />
        </VStack>
      ))}
    </HStack>
  );
};

const TextWithLabel = ({ labelText, bodyText }) => {
  // You can make it even more flexible by choosing,
  // if you will return it as React.Fragment or inside a div
  return (
    <Box>
      <Text variant="gentleTitle" children={labelText} />
      <Text m="0.1rem" mb="1rem" children={bodyText} />
    </Box>
  );
};

const ProjectCardLeftElement = ({ logo, discordId, githubLink }) => {
  // TODO: pass team specified logo
  return (
    <VStack alignSelf="flex-start" spacing={{ base: "0.5rem" }}>
      <Box position="relative" w="40px" h="40px">
        <Image src={logo} objectFit="cover" layout="fill" alt="team logo" />
      </Box>
      <Box>
        <SocialLink
          color={discord.color}
          icon={discord.icon}
          href={discordId}
          name={discord.name}
        />
        <SocialLink
          color={github.color}
          icon={github.icon}
          href={githubLink}
          name={github.name}
        />
      </Box>
    </VStack>
  );
};

const ProjectCardCenterElement = ({
  isMobile,
  projectName,
  teamName,
  keywords,
}) => {
  // // TODO: cap the max number of keywords
  return (
    <VStack
      alignSelf="flex-start"
      w={isMobile ? "inherit" : "30%"}
      h="inherit"
      verticalAlign="top"
    >
      <Heading as="h4" alignSelf="flex-start" variant="h3">
        {projectName}
      </Heading>
      <Text alignSelf="flex-start" variant="body">
        {teamName}
      </Text>

      <HStack
        justifyContent="center"
        flexWrap={isMobile ? "nowrap" : "wrap"}
        p={1}
      >
        {keywords.map((key) => (
          <Badge key={key.keyword} variant="primary" mt="0.5rem" mb="0.5rem">
            {key.keyword}
          </Badge>
        ))}
      </HStack>
    </VStack>
  );
};

const ProjectCardRightElement = ({ description, setExpanded }) => {
  return (
    <VStack w="70%" h="inherit" alignSelf="flex-start" verticalAlign="top">
      <Text variant="body" mb="2rem">
        {description}
      </Text>
      <Button
        pt="0.3rem"
        pr="2rem"
        alignSelf="flex-end"
        // justifySelf="flex-end"
        size="xs"
        variant="link"
        onClick={setExpanded.toggle}
      >
        Learn More
      </Button>
    </VStack>
  );
};

const ExpandableWrapper = ({ children, isVisible, data, ...other }) => {
  return (
    <VStack
      as="section"
      display={isVisible ? "visible" : "none"}
      w={{
        base: "360px",
        sm: "620px",
        md: "680px",
        lg: "780px",
        xl: "880px",
      }}
      p={{ base: "1rem", "2xl": "2rem" }}
      gap="0.5rem"
      {...other}
    >
      {/* This Is Expandable Section */}
      {children}
    </VStack>
  );
};

export default ProjectCard;
