"use client"

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

export const GoBack = () => {
    const router = useRouter()
    return (
        <Button variant={"ghost"} className={"rounded-full size-fit"} onClick={() => router.back()}>
            <ArrowLeft/>
        </Button>
    )
}