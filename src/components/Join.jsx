import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/join.css'

export default function Join() {
    const navigate = useNavigate();
    const now = new Date();

    // selectYear 태그
    const year = [];
    for(let i=now.getFullYear()-14, j=0; i>=1940; i--, j++) {
        year[j] = i ;
    }
    const selectYear = year.map((c) => <option key={c}>{c}</option>);
    // selectMonth 태그
    const month = [];
    for(let i=1; i<13; i++) {
        month[i-1] = i;
    }
    const selectMonth = month.map((c) => <option key={c}>{c}</option>);
    // selectDay 태그
    const day = [];
    for(let i=1; i<32; i++) {
        day[i-1] = i;
    }
    const selectDay = day .map((c) => <option key={c}>{c}</option>);

    // 휴대전화 입력
    const [frontPhone, setFrontPhone] = useState('');
    const handleFrontPhoneChange = (e) => {
        const phonCheck = e.target.value.replace(/[^0-9]/g,'');
        setFrontPhone(phonCheck);
    }
    const [BackPhone, setBackPhone] = useState('');
    const handleBackPhoneChange = (e) => {
        const phonCheck = e.target.value.replace(/[^0-9]/g,'');
        setBackPhone(phonCheck);
    }
    return (
    <div className="Join-container">
        <header>
            <div className='backBtn' onClick={() => {navigate(-1);}}><IoChevronBack /></div>
            <h2>회원가입</h2>
        </header>
        <section>
            <form>
                <div>이름 <input type="text"/></div> {/* userName */}
                <div>아이디 <input type="text"/></div> {/* userId */}
                <div>비밀번호 <input type="password"/></div> {/* userPassword */}
                <div>비밀번호 확인 <input type="password"/></div> {/* userPasswordCheck */}
                <div>휴대폰 번호 {/* userPhone */}
                    <select>
                        <option>010</option>
                        <option>011</option>
                        <option>016</option>
                        <option>017</option>
                    </select>
                    <input type="text" value={frontPhone} maxLength={4}
                        onChange={(e) => handleFrontPhoneChange(e)}/>
                    <input type="text" value={BackPhone} maxLength={4} 
                        onChange={(e) => handleBackPhoneChange(e)}/>
                </div>
                <div>생년월일 {/* userBirth */}
                    <select>
                        {selectYear}    
                    </select>
                    <select>
                        {selectMonth}    
                    </select>
                    <select>
                        {selectDay}    
                    </select>
                    
                    </div>
                <div>SMS,KAKAO 수신여부 <input type="radio" name="sms"/>예<input type="radio" name="sms"/>아니요</div> {/* userSmsAccept */}
                <div>이메일 <input type="text"/><span>@</span><input type="text"/></div>
                <div>메일수신여부 <input type="radio" name="email"/>예<input type="radio" name="email"/>아니요</div> {/* userEmailAccept */}
                <div>추천인아이디 <input type="text"/></div>
                <input type="submit" value='저장'/><input type="reset" value='취소'/>
            </form>
        </section>
    </div>
    );
}//Join
