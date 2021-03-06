import React, {FC, useContext, useEffect, useState} from 'react';
import {Image, View} from "react-native";
import {Avatar, ListItem, Tab, TabView} from "@rneui/themed";
import Colors from "@res/colors";
import {Button} from "@rneui/base";
import ChevronLeft from "@assets/chevron_left_FILL0_wght400_GRAD0_opsz48.png";
import ChevronRight from "@assets/chevron_right_FILL0_wght400_GRAD0_opsz48.png";
import {ChatContext} from "../../../Contexts";
import {IChat} from "../../../Types";
import ChatList from "../Chats/ChatList";

interface MissionsProps {
}

const missions = [
    {title: "Mission 1"},
    {title: "Another Mission"},
    {title: "Mission 3"},
    {title: "Mission 4"},
    {title: "Mission 6"},
    {title: "Mission 6"},
]
const chats = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
]
// const shuffleArray = unshuffled => unshuffled
//     .map(value => ({value, sort: Math.random()}))
//     .sort((a, b) => a.sort - b.sort)
//     .map(({value}) => value);

const Missions: FC<MissionsProps> = () => {
    const [tab, setTab] = React.useState(0);
    const chats = useContext(ChatContext);
    const [projects, setProjects] = useState<Array<{ projectId: string | number, chats: Array<IChat> }> | null>(null);
    useEffect(() => {
        if (!chats?.data) return;
        const projectsUnique = [...new Set(chats.data.map((chat, index) => chat.project_id))];
        setProjects(projectsUnique.map(projectId => ({
            projectId: projectId,
            chats: chats.data.filter(chat => chat.project_id === projectId)
        })));
    }, [chats])
    return (
        <View style={{height: '100%'}}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20
            }}>
                <Button disabled={tab === 0} color={"transparent"} onPress={() => setTab(tab - 1)}>
                    <Image source={ChevronLeft} style={{
                        width: 25,
                        height: 25
                    }}/>
                </Button>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: 0,
                    width: "85%",
                    paddingRight: 0
                }}>
                    <Tab
                        scrollable={true}
                        value={tab}
                        containerStyle={{backgroundColor: "transparent"}}
                        onChange={(e) => setTab(e)}
                        indicatorStyle={{
                            backgroundColor: Colors.primary,
                            height: 3,
                        }}
                        variant="primary">
                        {projects?.map(({projectId}) => (
                            <Tab.Item
                                title={`Project ${projectId}`}
                                key={`project-${projectId}`}
                                variant={"primary"}
                                containerStyle={{backgroundColor: "transparent"}}
                                titleStyle={{fontSize: 12, color: Colors.black}}
                            />
                        ))}
                    </Tab>
                </View>
                <Button disabled={tab === missions.length - 1} color={"transparent"} onPress={() => setTab(tab + 1)}>
                    <Image source={ChevronRight} style={{
                        width: 25,
                        height: 25
                    }}/>
                </Button>
            </View>
            <TabView value={tab} onChange={setTab} animationType={"spring"}>
                {projects?.map(({projectId, chats}) => (
                    <TabView.Item key={`project-${projectId}`} style={{backgroundColor: 'transparent', width: '100%'}}>
                        <ChatList chats={chats}/>
                    </TabView.Item>
                ))}
            </TabView>
        </View>
    );
}

export default Missions;
