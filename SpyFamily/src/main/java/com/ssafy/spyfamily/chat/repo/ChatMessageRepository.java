package com.ssafy.spyfamily.chat.repo;

import com.ssafy.spyfamily.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface ChatMessageRepository extends JpaRepository<ChatMessage , Long> {

    List<ChatMessage> findByRoomIdAndType(String roomId , Integer type ) ;

}
