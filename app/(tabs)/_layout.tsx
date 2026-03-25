import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import {useAppSelector} from "../hooks";
import {selectCount} from "../slices/menuSlice";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const count = useAppSelector(selectCount);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#007AFF",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerTitle: "My Tasks",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home-sharp" : "home-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="details"
                options={{
                    title: "Details",
                    headerTitle: "Task Details",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={
                                focused ? "information-circle" : "information-circle-outline"
                            }
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Add",
                    headerTitle: "New Task",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "add-circle" : "add-circle-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarBadge: count ? count : undefined,
                    headerTitle: "About App",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="newspaper-o" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="animations"
                options={{
                    title: "Animations",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "color-palette" : "color-palette-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen   
                name="db"
                options={{
                    title: "DB",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "cloud" : "cloud-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="gestures  "
                options={{
                    title: "Gestures",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "hand-left" : "hand-left-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
